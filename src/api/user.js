export const fetchUserProfile = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         },
    })

    console.log(response.name)
    if (response.name == "EntityNotFoundError") {
        console.log("problem identity")
        localStorage.removeItem("token")
        localStorage.removeItem("refresh-token")
        window.location.href = "/auth/login"
    }
    const data = await response.json()
    console.log(data)
    return data

}