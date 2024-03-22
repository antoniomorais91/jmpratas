import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "O id do produto é requerido.",
        });

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Produto excluido com sucesso.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Falha ao excluir o produto, por favor tente novamente.",
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
