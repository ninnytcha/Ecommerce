import { useCallback, useEffect, useState } from "react";
import "../styles/productTable.css";
import { Link } from "react-router-dom";
import { fetchUsersList } from "../api/user";

 const UsersTable = () => {
  const limit = 100;
  const offset = 0;
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const handleDelete = useCallback(async (id) => {
  const token = localStorage.getItem("token");
  try {
    await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}, []);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsersList({limit});
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    loadUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser({
      ...user,
    });
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem("token")
    await fetch(`https://api.escuelajs.co/api/v1/users/${editingUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify(editingUser),
        })
    setUsers(
      users.map((u) =>
        u.id === editingUser.id ? editingUser : u
      )
    );
    setEditingUser(null);
  };

  return (
    <div className="product-table-container">
      <h2>User's Table</h2>
       Add New User
      <div className="add-product">
        <Link to="/dashboard/user-create" className="add-button">
          + Create user
        </Link> 
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editingUser && editingUser.id === user.id ? (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="product-thumb"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        name: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        email: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                    <input
                    type="text"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role : e.target.value,
                      })
                    }/>
                </td>
                <td>
                  <button className="save-btn" onClick={handleSaveEdit}>
                    Save
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="product-thumb"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            )
          )
          }
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
