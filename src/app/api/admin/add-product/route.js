import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  categories: Joi.string().required(),
  subCategories: Joi.string().required(),
  sizes: Joi.array().required(),  
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req)

    console.log(isAuthUser , 'sangam');

    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();
    const {
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

    const { error } = AddNewProductSchema.validate({
      name,
      price,
      description,
      sizes,
      categories,
      subCategories,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Produto Adicionado com Sucesso.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Falha ao adicionar o produto, por favor tente novamente.",
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
