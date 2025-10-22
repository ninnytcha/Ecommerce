import { fetchProduct } from "../api/product"

export const fetchCartProducts = async ({ data }) => {
  const productPromises = data.products?.map(async (product) => {
    const id = product.productId
    let response = await fetchProduct({ id })
    response = {...response, quantity: product.quantity}

    return response
  }) || []

  const cartItems = await Promise.all(productPromises)
  return cartItems
}
