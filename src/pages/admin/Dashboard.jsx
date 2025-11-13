import { Link } from "react-router-dom"

export const Dashboard = () => {
    return (
        <>
        <span>This is Dashboard page</span>
        <Link to="/dashboard/products">Product page</Link>
        <Link to="/dashboard/users">Users' list page</Link>
        </>
    )
}