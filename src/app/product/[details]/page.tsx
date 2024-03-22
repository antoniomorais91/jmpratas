import { NextPageContext } from 'next';
import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

interface ParamsType {
  details: string; // Substitua 'string' pelo tipo correto, se for diferente
}

interface Props {
  params: ParamsType;
}

export default async function ProductDetails({ params }: Props) {
  const productDetailsData = await productById(params.details);

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}

// Use o código abaixo se estiver utilizando a versão antiga do Next.js (v9.x ou anterior)
ProductDetails.getInitialProps = async (context: NextPageContext) => {
  const { query } = context;
  const productDetailsData = await productById(query.details as string);

  return { params: { details: query.details as string } };
};
