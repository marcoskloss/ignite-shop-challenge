import { produce } from "immer"
import { Product } from "./product"

export type Cart = {
  items: CartItem[]
  quantity: number
  totalValue: number
}

export type CartItem = { product: Product, amount: number }

export function newEmptyCart(): Cart {
  return {
    items: [],
    quantity: 0,
    totalValue: 0,
  }
}

export function getQuantity(cart: Cart): number {
  return cart.items.reduce((acc, item) => item.amount + acc, 0)
}

export function getTotalValue(cart: Cart): number {
  return cart.items.reduce((acc, item) => 
    item.amount * item.product.priceNumber + acc, 0)
}

export function addProduct(cart: Cart, product: Product): Cart {
  const updatedCart = produce(cart, draft => {
    const productAlreadyInCart = draft.items.find(it => it.product.id === product.id)

    if (productAlreadyInCart) {
      productAlreadyInCart.amount += 1
    } else {
      draft.items.push({ product, amount: 1 })
    }
  })

  return updatedCart
}

export function removeProduct(cart: Cart, product: Product): Cart {
  const updatedCart = produce(cart, draft => {
    const existingProduct = draft.items.find(it => it.product.id === product.id)

    if (!existingProduct) return

    existingProduct.amount -= 1
    draft.items = draft.items.filter(item => item.amount > 0)
  })
  
  return updatedCart
}
