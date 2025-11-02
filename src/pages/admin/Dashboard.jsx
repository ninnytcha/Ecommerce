import { Link } from "react-router-dom"

export const Dashboard = () => {
    return (
        <>
        <span>This is Dashboard page</span>
        <Link to="/dashboard/product-create">Create Product page</Link>
        </>
    )
}