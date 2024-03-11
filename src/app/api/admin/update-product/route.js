import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();
      const {
        _id,
        name,
      price,
      description,
      categories,
      subCategories,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
      } = extractData;

      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          name,
      price,
      description,
      categories,
      subCategories,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
        },
        { new: true }
      );

      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Produto atualizado com sucesso.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Falha ao atualizar o produto, por favor tente novamente mais tarde.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Você não é autorizado.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Algo saiu errado, por favor tente novamente mais tarde.",
    });
  }
}
