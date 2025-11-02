export const fetchProductList = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    return response.json()
}
export const fetchProduct = async ({id}) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    return response.json()
}

export const fetchProductList2 = async ({limit, offset}) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`)
    return response.json()
}
export const fetchProduct2 = async ({id}) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    return response.json()
}