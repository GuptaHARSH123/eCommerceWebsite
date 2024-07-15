import allData from './DummyData';
import axios from 'axios';
export function getProductsDetails(id) {
   return  axios.get('https://dummyjson.com/products/'+id);   
}
export function getProductList() {
  return  axios.get('https://dummyjson.com/products').then(function(response){
     return response.data.products;
     
  })   
}