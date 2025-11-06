
export const fetchUserProfile = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         },
    })
    if (response.status === 400) {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh-token")
        window.location.href = "/auth/login"
    }
    const data = await response.json()
    return data

}