export const getUserCart = async (id) => {
    
    const response = await fetch(`https://fakestoreapi.com/carts/${id}`)
    return response.json()
}