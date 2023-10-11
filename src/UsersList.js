import { useEffect, useState } from "react";
import "./UsersList.css";

const UsersList = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    usertype: "Admin",
  });

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData((prevDataForm) => {
      return { ...prevDataForm, [name]: target.value };
    });
  };

  const setUser = (e) => {
    e.preventDefault();
    setUsers(users.concat({ ...formData, id: Date.now() }));
  };

  const removeUser = (id) => {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
  };

  const handleFilter = (name) => {
    let filteredUsers
    if (name === "Show Users") {
      filteredUsers = users.filter(user => user.usertype === "User");

    } else if (name === "Show Admins") {
      filteredUsers = users.filter(user => user.usertype === "Admin");

    } else {
      filteredUsers = users
    }
    setFilteredUsers(filteredUsers);
  };

  const showNobody = () => {
    setFilteredUsers([]);
  };

  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log("To sie pokaze po 5s");
    }, 5000)
  }, [])

  return (
    <div className="usersList">
      <form onSubmit={setUser}>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
          value={formData.username}
        />
        <label htmlFor="email">User email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="User email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <label htmlFor="usertype">User type</label>
        <select id="usertype" name="usertype" onChange={handleInputChange}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button type="submit">Save</button>
      </form>

      <div className="list">
        {filteredUsers.map((user) => {
          return (
            <div className="userItem" key={user.id} onClick={() => removeUser(user.id)}>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.usertype}</p>
            </div>
          );
        })}
      </div>

      <div className="buttons">
        <button name="Show Users" onClick={() => handleFilter("Show Users")}>Show Users</button>
        <button name="Show Admins" onClick={() => handleFilter("Show Admins")}>Show Admins</button>
        <button name="Show All" onClick={() => handleFilter("Show All")}>Show All</button>
        <button name="Show Nobody" onClick={showNobody}>Show Nobody</button>
      </div>
    </div>
  );
};

export default UsersList;
