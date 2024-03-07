"use client";

import { GlobalContext, GlobalStateType } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TfiMenu } from "react-icons/tfi";

interface NavbarProps {
  isModalView?: boolean;
  isAdminView: boolean;
  router: AppRouterInstance;
}

function NavItems(props: NavbarProps) {

  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        props.isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          props.isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
         {props.isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => props.router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => props.router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {

  const context = useContext(GlobalContext) as GlobalStateType;

  const { showNavModal, setShowNavModal,
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal
  } = context;

  const pathName = usePathname();
  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");

/*   console.log(currentUpdatedProduct, "navbar"); */

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null &&
      setCurrentUpdatedProduct
    ) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName, currentUpdatedProduct, setCurrentUpdatedProduct]);

  function handleLogout() {
    if (setIsAuthUser) {
      setIsAuthUser(false);
    }
    if (setUser) {
      setUser(null);
    }
    Cookies.remove("token");
    localStorage.clear();
    if (router) {
      router.push("/");
    }
  }

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <span className="slef-center text-2xl font-semibold whitespace-nowrap">
              JM Pratas
            </span>
          </div>
          <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-black rounded-sm md:hidden hover:bg-gray-300 focus:outline-none"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal && setShowNavModal(!showNavModal)}
            >
              <span className="sr-only">Abrir menu principal</span>
              <TfiMenu />
            </button>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  className={
                    "mt-1.5 inline-block bg-black px-3 py-2 lg:px-5 lg:py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                  onClick={()=>router.push('/account')}
                >
                  Conta
                </button>
                <button
                  className={
                    "mt-1.5 inline-block bg-black px-3 py-2 lg:px-5 lg:py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                  onClick={() => setShowCartModal && setShowCartModal(true)}
                >
                  Carrinho
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className={
                    "mt-1.5 inline-block bg-black px-3 py-2 lg:px-5 lg:py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                  onClick={() => router.push("/")}
                >
                  Área do Cliente
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  className={
                    "mt-1.5 inline-block bg-black px-3 py-2 lg:px-5 lg:py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                >
                  Área Administrativa
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className={
                  "mt-1.5 inline-block bg-black px-3 py-2 lg:px-5 lg:py-3 text-xs font-medium upprcase tracking-wide text-white"
                }
              >
                Sair
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className={
                  "mt-1.5 inline-block bg-black px-3 py-2 lg:px-5 lg:py-3 text-xs font-medium upprcase tracking-wide text-white"
                }
              >
                Entrar
              </button>
            )}
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
