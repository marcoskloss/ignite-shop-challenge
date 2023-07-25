import Stripe from "stripe";
import { stripe } from "./stripe";

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
}


export async function listAllProducts(): Promise<Product[]> {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  return response.data.map(stripeProductToDomainProduct)
}

export async function getProductById(id: string): Promise<Product> {
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price']
  })
  
  return stripeProductToDomainProduct(product)
}

export function stripeProductToDomainProduct(product: Stripe.Product): Product {
  const price = product.default_price as Stripe.Price
    
  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    description: product.description,
    defaultPriceId: price.id,
    price: new Intl
      .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(price.unit_amount / 100),
  }
}