import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCartItem, fetchCartItems, updateCartItem } from "./cartsApi";
import { deleteCartItem } from "./cartsApi";

const initialState = {
    items:[],
    status:'idle'
}


export  const fetchCartAsync = createAsyncThunk(
    'cart/fetchCartItem',
    async () => {
        const response = await fetchCartItems();
        console.log("init data",response.data);
        return response.data;
    }
  )

export const addCartAsync = createAsyncThunk(
    'cart/addCartItem', async (item) => {
        const response = await addCartItem({...item,quantity:1});
        const result = response.data;
        return result
    }
)

export const updateCartAsync = createAsyncThunk('cart/updateCartitem', async (itemVal) => {
    console.log("maan gye bhai", itemVal);
     const response = await updateCartItem(itemVal.prodData.id,{quantity:itemVal.prodData.quantity+1});
     const result = response.data;
     console.log(itemVal.itemId+0)
     return {item:result,itemIndex:itemVal.itemId+0}
})

export const deleteCartAsync = createAsyncThunk('cart/deleteCartItem',async (id) => {
    const response = await deleteCartItem(id);
    const result = response.data;
    return result
})



export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
 
    },
    extraReducers:(builder)=>{
       builder.addCase(fetchCartAsync.pending,(state) => {
        state.status = "pending"
       })
       .addCase(fetchCartAsync.fulfilled,(state,action)=>{
        state.items = action.payload
       })
       .addCase(addCartAsync.fulfilled,(state,action) => {
        state.items.push(action.payload)
       })
       .addCase(updateCartAsync.fulfilled,(state,action)=>{
        state.items.splice(action.payload.itemIndex,1)
       })
       .addCase(deleteCartAsync.fulfilled,(state,action)=>{
        state.items.splice(action.payload.id)
       })
    }
})

// export const {fetchProducts} = cartSlice.actions;

export default cartSlice.reducer;