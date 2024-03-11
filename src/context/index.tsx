"use client";

import { FormDataProduct } from "@/app/admin-view/add-product/page";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export interface GlobalStateType {
        children?: ReactNode;
        showNavModal?: boolean
        setShowNavModal?: React.Dispatch<SetStateAction<boolean>>
        pageLevelLoader?: boolean
        setPageLevelLoader?: React.Dispatch<SetStateAction<boolean>>
        isAuthUser?: boolean | null
        setIsAuthUser?: React.Dispatch<SetStateAction<boolean | null>>
        user?: {
          _id?: string;
          name: string;
          email: string;
          password: string;
          role: string;
        } | null;
        setUser?: React.Dispatch<SetStateAction<{
          _id?: string;
          name: string;
          email: string;
          password: string;
          role: string;
        } | null>>;
        componentLevelLoader?: {
          loading: boolean;
          id: string;
        };
        setComponentLevelLoader?: React.Dispatch<
          SetStateAction<{ loading: boolean; id: string }>
        >;
        currentUpdatedProduct?: FormDataProduct | null;
        setCurrentUpdatedProduct?: React.Dispatch<SetStateAction<FormDataProduct | null>>; 
        showCartModal?: boolean
        setShowCartModal?: React.Dispatch<SetStateAction<boolean>>
        cartItems?: never[];
        setCartItems?: React.Dispatch<SetStateAction<never[]>>;
        addresses?: never[];
        setAddresses?: React.Dispatch<SetStateAction<never[]>>; 
        addressFormData?: {
          fullName: string;
          city: string;
          country: string;
          postalCode: string;
          address: string;
        };
        setAddressFormData?: React.Dispatch<SetStateAction<{
          fullName: string;
          city: string;
          country: string;
          postalCode: string;
          address: string;
        }>>;
        checkoutFormData?: {
          shippingAddress: {};
          paymentMethod: string;
          totalPrice: number;
          isPaid: boolean;
          paidAt: Date;
          isProcessing: boolean;
        };
        setCheckoutFormData?: React.Dispatch<SetStateAction<{
          shippingAddress: {};
          paymentMethod: string;
          totalPrice: number;
          isPaid: boolean;
          paidAt: Date;
          isProcessing: boolean;
        }>>;  
        allOrdersForUser?: never[];
        setAllOrdersForUser?: React.Dispatch<SetStateAction<never[]>>;
        orderDetails?: never[] | null;
        setOrderDetails?: React.Dispatch<SetStateAction<never[] | null>>;
        allOrdersForAllUsers?: never[];
        setAllOrdersForAllUsers?: React.Dispatch<SetStateAction<never[]>>;
}

export const GlobalContext = createContext<GlobalStateType | undefined>(undefined);

export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];

const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];

export default function GlobalState({ children }: GlobalStateType) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState<{
    loading: boolean;
    id: string;
  }>({ loading: false, id: "" });

  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  } | null>(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState<FormDataProduct | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    city: "",
    country: "",
    postalCode: "",
    address: "",
  });

  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );

  const [allOrdersForUser, setAllOrdersForUser] = useState([]);
  const [orderDetails, setOrderDetails] = useState<never[] | null>(null);
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const checkToken = () => {
      if (Cookies.get("token") !== undefined) {
        setIsAuthUser(true);
        const userDataString = localStorage.getItem("user");
        const userData = userDataString ? JSON.parse(userDataString) : {};
  
        const cartItemsString = localStorage.getItem("cartItems");
        const getCartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
  
        setUser(userData);
        setCartItems(getCartItems);
      } else {
        setIsAuthUser(false);
        setUser(null); //unauthenticated user
      }
    };
  
    checkToken();
  }, []);

  useEffect(() => {
    const checkUserAndRedirect = () => {
      if (
        pathName !== "/register" &&
        !pathName.includes("product") &&
        pathName !== "/" &&
        user &&
        Object.keys(user).length === 0 &&
        protectedRoutes.includes(pathName)
      )
        router.push("/login");
    };
  
    checkUserAndRedirect();
  }, [user, pathName, router]);

  useEffect(() => {
    const redirectIfUnauthorized = () => {
      if (
        user !== null &&
        user &&
        Object.keys(user).length > 0 &&
        user?.role !== "admin" &&
        protectedAdminRoutes.indexOf(pathName) > -1
      )
        router.push("/unauthorized-page");
    };
  
    redirectIfUnauthorized();
  }, [user, pathName, router]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
        allOrdersForUser,
        setAllOrdersForUser,
        orderDetails,
        setOrderDetails,
        allOrdersForAllUsers,
        setAllOrdersForAllUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
