export const fetchCategory = async (limit) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories?limit=${limit}`)
    return response.json()
}

export const fetchCategoryProducts = async (id) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${Number(id)}/products?limit=${15}&offset=${0}`)
    return response.json()
}