import Image from "next/image";
import { createContext, useContext, useState } from "react";

import * as CartModule from "../core/cart";
import * as SalesModule from '../core/sales'
import { Product } from "../core/product";

import closeIcon from '../assets/close.svg'
import * as S from '../styles/cart'


type CartContext = {
  addProduct(product: Product): void
  removeProduct(product: Product): void
  quantity(): number
  total(): number
  toggleDrawer(): void
  isDrawerOpen: boolean
  items: CartModule.CartItem[]
  totalCurrencyFormat(): string
}

const Context = createContext({} as CartContext)

export function useCart() {
  return useContext(Context)
}

export function CartContextProvider({children}) {
  const [cart, setCart] = useState(CartModule.newEmptyCart())
  const [isOpen, setIsOpen] = useState(false)

  const addProduct = (product: Product) => {
    setCart(CartModule.addProduct(cart, product))
  }

  const removeProduct = (product: Product) => {
    setCart(CartModule.removeProduct(cart, product))
  }

  const quantity = () => CartModule.getQuantity(cart)

  const total = () => CartModule.getTotalValue(cart)

  const totalCurrencyFormat = () => new Intl
    .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(total())

  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <Context.Provider value={{
      addProduct,
      removeProduct,
      quantity,
      total,
      toggleDrawer,
      isDrawerOpen: isOpen,
      items: cart.items,
      totalCurrencyFormat,
    }}>
      {children}
    </Context.Provider>
  )
}

export function CartDrawer() {
  const cart = useCart()

  const buyItems = async () => {
    const { checkoutUrl } = await SalesModule.buyProducts(cart.items)
    window.location.href = checkoutUrl
  }
  
  return (
    <S.CartDrawer open={cart.isDrawerOpen}>
      <header>
        <button title='Fechar' onClick={cart.toggleDrawer}>
          <Image src={closeIcon} alt='' />
        </button>
      </header>
      <main>
        <h1>Sacola de compras</h1>
        <ul>
          {cart.items.map(({ amount, product }) => (
            <S.CartItem key={product.id}>
              <S.ImageContainer>
                <Image src={product.imageUrl} alt={product.name} height={95} width={95} />
              </S.ImageContainer>
              
              <div>
                <p>{product.name}</p>
                <p><strong>{product.price} x {amount}</strong></p>
                <button onClick={() => cart.removeProduct(product)}>Remover</button>
              </div>
            </S.CartItem>
          ))}
        </ul>

        <div className='spacer'></div>

        <footer>
          <div className="amount">
            <label>Quantidade</label>
            <span>{cart.quantity()} itens</span>
          </div>

          <div className="total">
            <label><strong>Valor total</strong></label>
            <span><strong>{cart.totalCurrencyFormat()}</strong></span>
          </div>

          <button onClick={buyItems}>Finalizar compra</button>
        </footer>
      </main>
    </S.CartDrawer>
  )
}

