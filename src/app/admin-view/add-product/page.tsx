"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext, GlobalStateType } from "@/context";
import { addNewProduct, updateAProduct } from "@/services/product";
import {
  AvailableSizes,
  AvailableCategories,
  AvailableSubCategories,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStorageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoIosAddCircleOutline } from "react-icons/io";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

interface TileType {
  id: string;
  label: string;
}

export interface FormDataProduct {
  name: string;
  price: number;
  description: string;
  categories: TileType[];
  subCategories: TileType[];
  sizes: TileType[];
  deliveryInfo: string;
  onSale: string;
  imageUrl: string;
  priceDrop: number; 
  [key: string]: string | number | TileType[]; // Permite outros tipos para índices além dos especificados
}

const initialFormData: FormDataProduct = {
  name: "",
  price: 0,
  description: "",
  categories: [],
  subCategories: [],
  sizes: [],
  deliveryInfo: "Entrega a definir",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const createUniqueFileName = (getFile: File) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file: File) {
  try {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `jmpratas/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise<string>((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Erro durante o upload da imagem:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => {
              console.error("Erro ao obter a URL da imagem:", error);
              reject(error);
            });
        }
      );
    });
  } catch (error) {
    console.error("Erro durante o upload da imagem:", error);
    throw error;
  }
}

async function deleteImageFromFirebase(imageUrl: string) {
  try {
    // Extrair o caminho do arquivo do URL da imagem
    const decodedUrl = decodeURIComponent(imageUrl);

    // Encontrar a posição da string 'jmpratas/' na URL decodificada
    const startIndex = decodedUrl.indexOf("jmpratas/") + "jmpratas/".length;

    // Extrair o restante da URL a partir da posição encontrada
    const fileNameAndParams = decodedUrl.substring(startIndex);

    // Extrair o nome do arquivo antes do primeiro '?' (se houver parâmetros)
    const fileName = fileNameAndParams.split("?")[0];

    // Referência ao objeto no Firebase Storage
    const storageReference = ref(storage, `jmpratas/${fileName}`);

    // Excluir o objeto
    await deleteObject(storageReference);

    console.log(`Imagem ${fileName} excluída com sucesso.`);

    // Retornar true para indicar que a exclusão foi bem-sucedida
    return true;
  } catch (error) {
    console.error("Erro ao excluir imagem:", error);

    // Retornar false para indicar que houve um erro na exclusão
    return false;
  }
}

export default function AdminAddNewProduct() {

  const context = useContext(GlobalContext) as GlobalStateType;
  
  const [formData, setFormData] = useState<FormDataProduct>(initialFormData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { componentLevelLoader,
    setComponentLevelLoader = () => {},
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = context;

  console.log(currentUpdatedProduct);

  const router = useRouter();

  useEffect(() => {
    if (currentUpdatedProduct) {
      setFormData(currentUpdatedProduct);
    }
  }, [currentUpdatedProduct]);

  useEffect(() => {
    if (currentUpdatedProduct && typeof currentUpdatedProduct === 'object') {
      setFormData(currentUpdatedProduct as FormDataProduct);
    }
  }, [currentUpdatedProduct]);

  async function selectImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    } else {
      console.error('Nenhum arquivo selecionado.');
      // Se desejar, você pode também adicionar setSelectedImage(null) aqui
    }
  }

  async function handleImageUpload() {
    setComponentLevelLoader({ loading: true, id: "loaderImage" });
  
    // Obter a URL da imagem atual, se existir
    const previousImageUrl = currentUpdatedProduct?.imageUrl || "";
  
    try {
      let extractImageUrl = "";
  
      // Verificar se uma nova imagem foi selecionada
      if (selectedImage) {
        extractImageUrl = (await helperForUPloadingImageToFirebase(selectedImage)) as string;
  
        // Se houver uma imagem anterior, exclua-a
        if (previousImageUrl) {
          const deletionSuccess = await deleteImageFromFirebase(previousImageUrl);
  
          if (deletionSuccess) {
            console.log("Imagem anterior excluída com sucesso.");
          } else {
            console.error("Erro ao excluir a imagem anterior.");
            toast.error("Erro ao excluir a imagem anterior", {
              position: "top-right",
            });
  
            setComponentLevelLoader({ loading: false, id: "loaderImage" });
            return;
          }
        }
      }
  
      if (extractImageUrl !== "") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageUrl: extractImageUrl,
        }));
  
        setImageLoaded(true);
        setComponentLevelLoader({ loading: false, id: "loaderImage" });
        toast.success("A imagem foi enviada com sucesso.", {
          position: "top-right",
        });
  
        return extractImageUrl;
      }
    } catch (error) {
      console.error("Erro ao carregar a imagem:", error);
      toast.error("Erro ao carregar a imagem", {
        position: "top-right",
      });
      return false;
    } finally {
      setComponentLevelLoader({ loading: false, id: "loaderImage" });
      setImageLoaded(false);
    }
  }

  function handleSizesClick(getCurrentItem: TileType) {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  function handleCategoriesClick(getCurrentItem: TileType) {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.categories.some(
        (item) => item.id === getCurrentItem.id
      );
  
      return {
        ...prevFormData,
        categories: isSelected ? [] : [getCurrentItem],
      };
    });
  }
  

  function handleSubCategoriesClick(getCurrentItem: TileType) {
    setFormData((prevFormData) => {
      const isAlreadySelected = prevFormData.subCategories.some(
        (subCategory) => subCategory.id === getCurrentItem.id
      );
  
      let updatedSubCategories: TileType[];
      
      if (isAlreadySelected) {
        // Se a subcategoria já estiver selecionada, remova todas as seleções anteriores
        updatedSubCategories = [];
      } else {
        // Se a subcategoria não estiver selecionada, substitua todas as seleções anteriores pela nova
        updatedSubCategories = [getCurrentItem];
      }
  
      return {
        ...prevFormData,
        subCategories: updatedSubCategories,
      };
    });
  }  

  async function handleAddProduct() {
    setComponentLevelLoader({ loading: true, id: "loaderProduct" });
  
    const result = await handleImageUpload();
  
    if (typeof result === 'string') {
      formData.imageUrl = result;
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct(formData)
        : await addNewProduct(formData);

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "loaderProduct" });
      toast.success(res.message, {
        position: "top-right",
      });

      setFormData(initialFormData);
      if (setCurrentUpdatedProduct) {
        setCurrentUpdatedProduct(null);
      }
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      // Lidar com os casos em que result é false ou undefined
      console.error('Erro ao carregar a imagem');
      toast.error('Erro ao carregar a imagem', {
        position: 'top-right',
      });
    }
  }
}

  console.log(formData);

  return (
    <div className="py-4 px-6 lg:px-8 justify-center bg-white">
      <div className="mx-auto max-w-screen-xl px-4 flex flex-col sm:px-6 lg:px-8">
        <div className="flex items-center mx-auto max-w-screen-xl pt-16 px-4 sm:px-6 lg:px-8">
          <IoIosAddCircleOutline size={"2em"} />
          <h1 className="px-6 text-2xl lg:text-3xl font-bold">
            {currentUpdatedProduct
              ? `Atualização do Produto ${formData.name}`
              : "Cadastro de Produtos"}
          </h1>
        </div>
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <div className="flex gap-2 flex-col">
            <label>Imagem</label>
            <input
              accept="image/*"
              max="1000000"
              type="file"
              onChange={selectImage}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label>Categorias</label>
            <TileComponent
              selected={formData.categories}
              onClick={handleCategoriesClick}
              data={AvailableCategories}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label>Sub-Categorias</label>
            <TileComponent
              selected={formData.subCategories}
              onClick={handleSubCategoriesClick}
              data={AvailableSubCategories}
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label>Tamanhos Disponíveis</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleSizesClick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                key={controlItem.id}
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                value={formData[controlItem.id] as string}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                key={controlItem.id}
                label={controlItem.label}
                options={controlItem.options}
                value={formData[controlItem.id as keyof FormDataProduct]}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : null
          )}
          <div className="flex gap-2">
            <button
              onClick={handleAddProduct}
              className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
            >
              {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  id="loaderProduct"
                  text={
                    currentUpdatedProduct !== null
                      ? "Atualizando Produto"
                      : "Adicionando Produto"
                  }
                  color={"#ffffff"}
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : currentUpdatedProduct !== null ? (
                "Atualizar Produto"
              ) : (
                "Adicionar Produto"
              )}
            </button>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}