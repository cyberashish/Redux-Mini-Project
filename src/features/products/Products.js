import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "./productSlice";
import { useEffect } from "react";
import { Dialog,  DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Cart from "../cart/Cart";
import {  addCartAsync, fetchCartAsync, updateCartAsync} from "../cart/cartSlice";
import { addCartItem, updateCartItem } from "../cart/cartsApi";


export function Products() {

const dispatch = useDispatch();

const products = useSelector((state) => state.product.products);
let cartProducts = useSelector((state)=>state.cartProduct.items)

let [isOpen, setIsOpen] = useState(false);

useEffect(()=>{
  console.log(cartProducts)
})



const handleCart = (item)=>{
  if(cartProducts.length>0){
    
    let product = cartProducts.find((product)=>{
      return product.id === item.id
    });
   if(product){
      let itemIndex = cartProducts.findIndex((product)=>{
        return product.id===item.id
      })
      console.log("chal na bhai",itemIndex)
     dispatch(updateCartAsync({prodData:product,itemId:itemIndex+""}))
    setIsOpen(true);

   }
   else{
    dispatch(addCartAsync({...item,quantity:1}));
    setIsOpen(true);
   }
  }
  else{
    dispatch(addCartAsync({...item,quantity:1}));
    setIsOpen(true);
  }



}

 useEffect(()=>{
  dispatch(fetchCartAsync());
 },[])

  return (
  <>
  <button onClick={() => dispatch(fetchAsync())} className="custom-btn bg-blue-500 py-2 px-3 w-fit mx-10 rounded-md text-white hover:translate-y-1 transition-all cursor-pointer" >Init Option</button>
  <div className="container">
    {products && products.map((item,index)=>{
      return (
        <div className="product-card" key={index}>
    <div
        className="product-image"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
    ></div>
    <h2 className="product-title">{item.title}</h2>
    <p className="product-description">
        {item.description}
    </p>
    <p className="product-price">{`$${item.price}`}</p>
    <button className="btn" onClick={()=>{
      handleCart(item)
    }} >Add to Cart</button>
</div>
      )
    })}
  </div>

  <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
           {/* The backdrop, rendered as a fixed sibling to the panel container */}
           <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-6xl max-h-screen overflow-y-auto space-y-4 border bg-white px-12">
          <DialogTitle className={'text-3xl font-semibold text-blue-500 text-center my-4'} >Your Product Cart</DialogTitle>
             <Cart/>
          </DialogPanel>
        </div>
      </Dialog>


  </>
  );
}
