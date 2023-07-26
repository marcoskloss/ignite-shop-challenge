import Link from "next/link";
import { GetServerSideProps } from "next";
import Image from "next/image";

import { ImagesContainer, SuccessContainer } from "../styles/pages/success";
import { getSalesInfo, type Sale } from "../core/sales";

type Props = {
  sales: Sale
}

export default function Success({ sales}: Props) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImagesContainer>
        {sales.products.map(product => (
          <div key={product.id}>
            <Image src={product.imageUrl} alt={product.name} width={130} height={145} />
          </div>
        ))}
      </ImagesContainer>

      <p>Uhuul, <strong>{sales.customerName}</strong> sua compra de {sales.products.length} camisetas já está a caminho!</p>

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
  const sales = await getSalesInfo(sessionId)
  
  return {
    props: { sales }
  }
}
