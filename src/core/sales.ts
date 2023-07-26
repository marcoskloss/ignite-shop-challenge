import Stripe from "stripe";
import axios from "axios";

import { stripeProductToDomainProduct, type Product } from "./product";
import { stripe } from "./stripe";
import type { CartItem } from "./cart";

export async function buyProducts(items: CartItem[]): Promise<{ checkoutUrl: string }> {
  const response = await axios.post('/api/checkout', { items })
  return response.data
}

export type Sale = {
  customerName: string
  products: Product[]
}

export async function getSalesInfo(sessionId: string): Promise<Sale> {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name

  const products = session.line_items.data.map(lineItem => {
    const price = lineItem.price
    const product = price.product as Stripe.Product
    product.default_price = price
    return stripeProductToDomainProduct(product)
  })
  
  return { customerName, products }
}
