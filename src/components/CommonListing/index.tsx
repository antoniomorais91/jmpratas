"use client"

// Importações necessárias
import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";
import { FormDataProduct } from "@/app/admin-view/add-product/page";

interface Item extends FormDataProduct {
  _id: string;
  // Adicione outras propriedades conforme necessário
}

// Defina as propriedades do componente
interface CommonListingProps {
  data: Item[] | null;
}

// Componente CommonListing
export default function CommonListing({ data }: CommonListingProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  // Verifique se 'data' não é nulo antes de mapear
  if (!data || data.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {/* Mapeie os itens e renderize cada um */}
          {data.map((item) => (
            <article
              className="relative flex flex-col overflow-hidden border cursor-pointer"
              key={item._id}
            >
              <ProductTile item={item} />
              <ProductButton item={item} />
            </article>
          ))}
        </div>
      </div>
      <Notification />
    </section>
  );
}
