import Stripe from "stripe";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Image from "next/image";

import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { getSalesInfo, type Sale } from "../core/sales";

type Props = {
  sale: Sale
}

export default function Success({ sale }: Props) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src={sale.product.imageUrl} alt={sale.product.name} width={130} height={145} />
      </ImageContainer>

      <p>Uhuul, <strong>{sale.customerName}</strong> sua <strong>{sale.product.name}</strong> já está a caminho!</p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  
  const sessionId = String(query.session_id)
  const sale = await getSalesInfo(sessionId)
  
  return {
    props: { sale }
  }
}
