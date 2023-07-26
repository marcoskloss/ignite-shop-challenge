import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../core/stripe";
import { CartItem } from "../../core/cart";
import Stripe from "stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') 
    return res.status(405).end()
  
  const items: CartItem[] = req.body.items

  if (!items || items.length === 0)
    return res.status(400).json({ error: 'items not provided' })

  const successUrl = `${process.env.NEXT_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_APP_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: items.map(cartItemToLineItem)
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}

function cartItemToLineItem(item: CartItem): Stripe.Checkout.SessionCreateParams.LineItem {
  return { price: item.product.defaultPriceId, quantity: item.amount }
}
