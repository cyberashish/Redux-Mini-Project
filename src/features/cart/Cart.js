import { Icon } from '@iconify/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem } from './cartsApi';
import { fetchAsync } from '../products/productSlice';
import { deleteCartAsync } from './cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartProduct.items);
  const dispatch = useDispatch();



  
  return (
    <div className='flex flex-wrap justify-between gap-6'>
      {
        cartItems && cartItems.map((item,index)=>{
          return (
            <div className="product-card relative" key={index}>
            <div
                className="product-image"
                style={{ backgroundImage: `url(${item.thumbnail})` }}
            ></div>
            <h2 className="product-title">{item.title}</h2>
            <p className="product-description">
                {item.description}
            </p>
            <p className="product-price">{`$${item.price}`}</p>
            <p className="my-4 w-fit bg-red-700 p-0.5 px-4 rounded-md text-white">{`${item.quantity??0}`}</p>
             <Icon icon="solar:trash-bin-minimalistic-bold-duotone" className='hover:text-red-600 text-2xl absolute top-2 end-2 cursor-pointer text-orange-600' onClick={()=>{dispatch(deleteCartAsync(item.id))}} />
        </div>
          )
        })
      }
    </div>
  )
}

export default Cart
