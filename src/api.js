import allData from './DummyData';
import axios from 'axios';
export function getProductsDetails(id) {
   return  axios.get('https://dummyjson.com/products/'+id).then(function(respone){
      return respone.data;
   });   
}
export function getProductList({sort,pageNo,query}) {
   let params ={
      skip:pageNo
   }
   if(sort=='title'){
      params.sortBy = 'title'
      params.order='asc'
   }
   if(query){
      params.q=query
   }
   if(sort=='price'){
      params.sortBy = 'price'
      params.order= 'asc'
   }
   if(sort=='priceHighToLow'){
      params.sortBy = 'price'
      params.order='desc'
   }
  return  axios.get('https://dummyjson.com/products/search',{
   params ,
   
   
  }).then(function(response){
    console.log(response.data.products);
    console.log(response.data)
    
     return response.data;
     
  })   
}