export const Logout = () => {
    return (
        localStorage.removeItem("token")
    )
}