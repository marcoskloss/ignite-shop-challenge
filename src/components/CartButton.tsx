import Image from "next/image";

import { useCart } from "./Cart";
import cartBagImg from '../assets/bag.svg'
import { CartButton as SCartButton } from "../styles/pages/app";

export default function CartButton() {
  const { toggleDrawer, quantity } = useCart()
  
  return (
    <SCartButton title='Abrir sacola' onClick={toggleDrawer} cartHasItems={quantity() > 0}>
      <span>{quantity()}</span>
      <Image src={cartBagImg} alt="" />
    </SCartButton>
  )
}
