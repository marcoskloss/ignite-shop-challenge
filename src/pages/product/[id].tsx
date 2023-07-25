import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { Product, getProductById } from "../../core/product";
import { buyProduct } from "../../core/sales";

type Props = {
  product: Product
}

export default function Product({ product }: Props) {
  const { isFallback } = useRouter()

  const onBuyProduct = async () => {
    const { checkoutUrl } = await buyProduct(product)
    window.location.href = checkoutUrl
  }

  if (isFallback) {
    return <p>[LOADING]: Executando getStaticProps...</p>
  }
  
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} height={520} width={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={onBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params.id as string
  const product = await getProductById(productId)
  
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
