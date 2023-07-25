import Stripe from "stripe";
import axios from "axios";
import { stripeProductToDomainProduct, type Product } from "./product";
import { stripe } from "./stripe";

export async function buyProduct(product: Product): Promise<{ checkoutUrl: string }> {
  const response = await axios.post('/api/checkout', {
    priceId: product.defaultPriceId
  })

  return response.data
}

export type Sale = {
  customerName: string
  product: Product
}

export async function getSalesInfo(sessionId: string): Promise<Sale> {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const price = session.line_items.data[0].price
  const product = price.product as Stripe.Product

  product.default_price = price

  return {
    customerName,
    product: stripeProductToDomainProduct(product)
  }
}
