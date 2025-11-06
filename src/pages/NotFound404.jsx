import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <>
        <span>Page not found 404</span>
        <Link to="/">Back to home page</Link>
        </>
    )
}