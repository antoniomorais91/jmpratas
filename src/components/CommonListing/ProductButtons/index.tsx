"use client"

// Importe as tipagens necessárias
import { useRouter } from 'next/navigation';
import ComponentLevelLoader from '@/components/Loader/componentlevel';
import { GlobalContext, GlobalStateType } from '@/context';
import { addToCart } from '@/services/cart';
import { deleteAProduct } from '@/services/product';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { initialFormData, FormDataProduct } from '@/app/admin-view/add-product/page';
import { deleteImageFromFirebase } from '@/app/admin-view/add-product/page';

// Defina as propriedades do item
interface Item extends FormDataProduct {
  _id: string;
  // Adicione outras propriedades conforme necessário
}

// Defina as propriedades do componente
interface ProductButtonProps {
  item: Item;
}

export default function ProductButton({ item }: ProductButtonProps) {
  const pathName = usePathname();

  const context = useContext(GlobalContext) as GlobalStateType;

  const {
    currentUpdatedProduct,
    setCurrentUpdatedProduct = () => {},
    setComponentLevelLoader = () => {},
    componentLevelLoader,
    user,
    showCartModal,
    setShowCartModal = () => {},
  } = context;
  const router = useRouter();

  const isAdminView = pathName.includes('admin-view');

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (currentUpdatedProduct && typeof currentUpdatedProduct === 'object') {
      setCurrentUpdatedProduct(currentUpdatedProduct as FormDataProduct);
    }
  }, [currentUpdatedProduct, setCurrentUpdatedProduct]);

  async function handleDeleteProduct(item: Item) {
    setComponentLevelLoader({ loading: true, id: item._id });
  
    try {
      // Chame a função para excluir a imagem do Firebase
      const isImageDeleted = await deleteImageFromFirebase(item.imageUrl);
  
      if (isImageDeleted) {
        // Se a exclusão da imagem for bem-sucedida, prossiga com a exclusão do produto no MongoDB
        const res = await deleteAProduct(item._id);
  
        if (res.success) {
          setComponentLevelLoader({ loading: false, id: '' });
          toast.success(res.message, {
            position: 'top-right',
          });
          router.refresh();
        } else {
          toast.error(res.message, {
            position: 'top-right',
          });
          setComponentLevelLoader({ loading: false, id: '' });
        }
      } else {
        // Se houver um problema na exclusão da imagem, exiba uma mensagem de erro
        toast.error('Erro ao excluir a imagem do Firebase', {
          position: 'top-right',
        });
        setComponentLevelLoader({ loading: false, id: '' });
      }
    } catch (error) {
      // Se ocorrer um erro durante o processo, trate-o adequadamente
      console.error('Erro ao excluir o produto:', error);
      setComponentLevelLoader({ loading: false, id: '' });
      toast.error('Erro ao excluir o produto', {
        position: 'top-right',
      });
    }
  }

  async function handleAddToCart(getItem: Item) {
    setComponentLevelLoader({ loading: true, id: getItem._id });

    // Verifique se 'user' e 'user._id' são definidos
    if (!user || !user._id) {
      console.error('Usuário ou identificador não estão definidos.');
      setComponentLevelLoader({ loading: false, id: '' });
      return;
    }

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: 'top-right',
      });
      setComponentLevelLoader({ loading: false, id: '' });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: 'top-right',
      });
      setComponentLevelLoader({ loading: false, id: '' });
      setShowCartModal(true);
    }

    console.log(res);
  }

  return isAdminView ? (
    <>
      <button
  onClick={() => {
    setCurrentUpdatedProduct(item);
    router.push("/admin-view/add-product");
  }}
  className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
>
  Atualizar
</button>

      <button
        onClick={() => handleDeleteProduct(item)}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={'Deletando Produto'}
            color={'#ffffff'}
            loading={
              componentLevelLoader && componentLevelLoader.loading
            }
          />
        ) : (
          'Excluir'
        )}
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleAddToCart(item)}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={'Adicionando ao Carrinnho'}
            color={'#ffffff'}
            loading={
              componentLevelLoader && componentLevelLoader.loading
            }
          />
        ) : (
          'Adicionar ao Carrinho'
        )}
      </button>
    </>
  );
}
