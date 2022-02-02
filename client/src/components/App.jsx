import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [inputText, setInputText] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((res) => {
      setUsers(res.data);
    });
  });
  
  function createUser() {
    Axios.post("http://localhost:3001/createUser", {
      name: inputText.name,
      email: inputText.email
    }).then((res) => {
      setUsers((preV)=>{
        return [...preV, 
        {
          name: inputText.name,
          email: inputText.email
        }
        ]
      })
      setInputText({name:"", email:""});
    });
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setInputText((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  }
  return (
    <div>
      <div>
        {users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Email: {user.email}</h1>
            </div>
          );
        })}
      </div>
      <div>
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          onChange={handleChange}
          value={inputText.name}
        />
        <input
          name="email"
          type="text"
          placeholder="Enter your email"
          onChange={handleChange}
          value={inputText.email}
        />
        <button type="submit" onClick={createUser}>
          Create User
        </button>
      </div>
    </div>
  );
}

export default App;