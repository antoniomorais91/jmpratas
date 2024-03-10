import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";
import { FaRegClipboard } from "react-icons/fa";

export default async function AdminAllProducts() {

  const allAdminProducts = await getAllAdminProducts()

  return  (
    <div className="py-4 px-6 lg:px-8 justify-center bg-white">
      <div className="flex items-center justify-center mx-auto max-w-screen-xl pt-16 px-4 sm:px-6 lg:px-8">
          <FaRegClipboard size={"2em"} />
          <h1 className="px-6 text-2xl lg:text-3xl font-bold">
            Gerenciar Produtos
          </h1>
      </div>
      <CommonListing data={allAdminProducts && allAdminProducts.data}/>
    </div>
  ) 
}
