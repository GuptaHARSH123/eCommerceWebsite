import axios from 'axios';
export function getProductsDetails(id) {
   return  axios.get('https://dummyjson.com/products/'+id).then(function(respone){
      return respone.data;
   });   
}
export function getProductList({ q = "", sortBy = "default", skip = 0, order = "asc" }) {
   return axios.get('https://dummyjson.com/products/search', {
     params: {
       q,
       sortBy,
       skip,
       order,
     }
   }).then(function(response) {
     console.log(response.data.products);
     console.log(response.data);
     return response.data;
   });
 }

 export async function saveCart(cart) {
  const response = await axios.post(
    "https://myeasykart.codeyogi.io/carts",
    { data: cart },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  );
  return response.data;
}

export async function getCart() {
  const response = await axios.get("https://myeasykart.codeyogi.io/carts", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data.reduce((acc, { product, quantity }) => {
    acc[product.id] = quantity;
    return acc;
  }, {});
}

 