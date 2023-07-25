import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from 'keen-slider/react'

import { listAllProducts } from "../core/product";
import type { Product as ProductType } from "../core/product";

import { HomeContainer, Product } from "../styles/pages/home";
import 'keen-slider/keen-slider.min.css'

type Props = {
  products: ProductType[];
}

export default function Home({ products }: Props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  
  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
          <Product className='keen-slider__slide'>
            <Image src={product.imageUrl} width={520} height={480} alt='produto' />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
      
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await listAllProducts()

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
