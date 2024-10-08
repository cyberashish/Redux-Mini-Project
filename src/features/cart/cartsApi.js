import axios from "axios"

export function fetchCartItems(){
    return axios.get("http://localhost:8080/cart")
}

export function addCartItem(item){
    return axios.post("http://localhost:8080/cart",item)
}

export function updateCartItem(id,updatedItemValue){
    return axios.patch(`http://localhost:8080/cart/${id}`,updatedItemValue)
}

export function deleteCartItem(id){
    return axios.delete(`http://localhost:8080/cart/${id}`)
}