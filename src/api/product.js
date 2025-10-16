export const fetchProductList = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    return response.json()
}
export const fetchProduct = async ({id}) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    return response.json()
}
