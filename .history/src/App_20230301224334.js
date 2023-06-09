import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = event => {
    event.preventDefault()

    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUsers = [...users, data]
        setUsers(newUsers);
      })
      .catch(err => console.err(err))
    event.target.reset();

  }
  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="name" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" placeholder="email" />
        <br />
        <button type="submit">Add User</button>
      </form>
      <h2>Users: {users.length}</h2>
      <div>
        {
          users.map(user => <p key={user.id}>{user.name} {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
