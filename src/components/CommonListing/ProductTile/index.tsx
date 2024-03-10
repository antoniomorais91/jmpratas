"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

// Defina as propriedades do item
interface Item {
  _id: string;
  imageUrl: string;
  onSale: string;
  price: number;
  priceDrop: number;
  name: string;
  // Adicione outras propriedades conforme necessário
}

// Defina as propriedades do componente
interface ProductTileProps {
  item: Item;
}

export default function ProductTile({ item }: ProductTileProps) {
  const router = useRouter();
  
  return (
    <div  onClick={()=> router.push(`/product/${item._id}`)}>
      <div className="overflow-hideen aspect-w-1 aspect-h-1 h-52">
        <Image src={item.imageUrl}
          alt="Product image"
          width={200}
          height={200}
          className="h-full w-full object-cover ease-out transition-all duration-300 hover:scale-105"/>
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            A Venda
          </p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-11/12 flex-col items-start justify-between">
        <div className="mb-2 flex justify-center">
          <p
            className={`mr-3 text-sm font-semibold ${
              item.onSale === "yes" ? "line-through" : ""
            }`}
          >{`R$ ${item.price}`}</p>
          {item.onSale === "yes" ? (
            <p className="mr-3 text-sm font-semibold text-red-700">{`R$ ${(
              item.price -
              item.price * (item.priceDrop / 100)
            ).toFixed(2)}`}</p>
          ) : null}
          {item.onSale === "yes" ? (
            <p className="mr-3 text-sm font-semibold">{`- (${item.priceDrop}%) de desconto`}</p>
          ) : null}
        </div>
        <h3 className="md-2 text-black text-md">{item.name}</h3>
      </div>
    </div>
  );
}
