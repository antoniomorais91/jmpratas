export const navOptions = [
  {
    id: "Início",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "Todos os Produtos",
    path: "/product/listing/all-products",
  },
  {
    id: "listingMen",
    label: "Homem",
    path: "/product/listing/men",
  },
  {
    id: "listingWomen",
    label: "Mulher",
    path: "/product/listing/women",
  },
  {
    id: "listingKids",
    label: "Crianças",
    path: "/product/listing/kids",
  },
  {
    id: "listingClean",
    label: "Limpeza",
    path: "/product/listing/clean",
  },
];

export const adminNavOptions = [
  {
    id: "adminView",
    label: "Gerenciar Pedidos",
    path: "/admin-view",
  },
  {
    id: "adminListing",
    label: "Gerenciar Produtos",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Adicionar Produto",
    path: "/admin-view/add-product",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Insira seu nome",
    label: "Nome",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Insira seu e-mail",
    label: "E-mail",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Insira sua senha",
    label: "Senha",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Tipo",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Administrador",
      },
      {
        id: "customer",
        label: "Cliente",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Insira seu e-mail",
    label: "E-mail",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Insira sua senha",
    label: "Senha",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Insira o nome",
    label: "Nome",
    componentType: "input",
  },
  {
    id: "categories",
    type: "",
    placeholder: "Selecione a Categoria",
    label: "Categoria",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "Homem",
      },
      {
        id: "women",
        label: "Mulher",
      },
      {
        id: "kids",
        label: "Infantil",
      },
      {
        id: "clean",
        label: "Limpeza",
      },
    ],
  },
  {
    id: "subCategories",
    type: "",
    placeholder: "Selecione a Sub-Categoria",
    label: "Sub-Categoria",
    componentType: "select",
    options: [
      {
        id: "masc_dedeiras",
        label: "Masculino - Dedeiras",
      },
      {
        id: "masc_correntes",
        label: "Masculino - Correntes",
      },
      {
        id: "masc_pingentes",
        label: "Masculino - Pingentes",
      },
      {
        id: "masc_pulseiras",
        label: "Masculino - Pulseiras",
      },
      {
        id: "masc_brincosetrios",
        label: "Masculino - Brincos e Trios",
      },
      {
        id: "fem_aneis",
        label: "Feminino - Anéis",
      },
      {
        id: "fem_colar",
        label: "Feminino - Colar",
      },
      {
        id: "fem_pulseiras",
        label: "Feminino - Pulseiras e Braceletes",
      },
      {
        id: "fem_brincos",
        label: "Feminino - Brincos: Argolas, Trios e Brincos",
      },
      {
        id: "fem_piercing",
        label: "Feminino - Piercing",
      },
      {
        id: "fem_tornozeleira",
        label: "Feminino - Tornozeleira",
      },
      {
        id: "fem_pingentes",
        label: "Feminino - Pingentes",
      },
      {
        id: "fem_pandoraeberloques",
        label: "Feminino - Pandora e Berloques",
      },
      {
        id:"others",
        label: "Outros",
      },
    ],
  },
  {
    id: "price",
    type: "number",
    placeholder: "Insira o preço",
    label: "Preço",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Insira a descrição",
    label: "Descrição",
    componentType: "input",
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Insira as informações de entrega",
    label: "Informações de entrega",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "A Venda",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Sim",
      },
      {
        id: "no",
        label: "Não",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Insira a porcentagem do desconto",
    label: "Desconto(%)",
    componentType: "input",
  },
];

export const AvailableSizes = [
  {
    id: "21cm",
    label: "21cm",
  },
  {
    id: "50cm",
    label: "50cm",
  },
  {
    id: "60cm",
    label: "60cm",
  },
  {
    id: "70cm",
    label: "70cm",
  },
  {
    id: "80cm",
    label: "80cm",
  },
  {
    id: "xs",
    label: "PP",
  },
  {
    id: "s",
    label: "P",
  },
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "G",
  },
  {
    id: "14",
    label: "14",
  },
  {
    id: "16",
    label: "16",
  },
  {
    id: "17",
    label: "17",
  },
  {
    id: "18",
    label: "18",
  },
  {
    id: "19",
    label: "19",
  },
  {
    id: "20",
    label: "20",
  },
  {
    id: "21",
    label: "21",
  },
  {
    id: "22",
    label: "22",
  },
  {
    id: "adjustable",
    label: "Regulável",
  },
];

export const firebaseConfig = {
  apiKey: process.env.APIKEY_FIREBASE,
  authDomain: process.env.AUTHDOMAIN_FIREBASE,
  projectId: process.env.PROJECT_ID_FIREBASE,
  storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.APP_ID_FIREBASE,
  measurementId: process.env.MEASUREMENT_ID_FIREBASE
};

export const firebaseStorageURL = "gs://nextjs-jmpratas.appspot.com";

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Insira seu nome completo",
    label: "Nome completo",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Insira seu endereço",
    label: "Endereço",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Insira sua cidade",
    label: "Cidade",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Insira seu país",
    label: "País",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Insira seu CEP",
    label: "CEP",
    componentType: "input",
  },
];
