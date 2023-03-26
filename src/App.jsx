import { useState, useEffect } from "react";
import "./App.css";

import { useAuth, usePolybase } from "@polybase/react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const { auth } = useAuth();
  const polybase = usePolybase();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const collectionReference = polybase.collection("User").onSnapshot(
      (newDoc) => {
        setUsers(newDoc.data);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  async function create_record() {
    await polybase.collection("User").create([uuidv4().toString(), name]);
    setName("");
  }

  async function remove_record(id) {
    await polybase.collection("User").record(id).call("del", []);
  }

  const User = ({ user }) => {
    return (
      <div className="card">
        <p>ID: {user.data?.id}</p>
        <p>Name: {user.data?.name}</p>
        <button onClick={() => remove_record(user.data?.id)}>
          Remove record
        </button>
      </div>
    );
  };

  function handleInputChange(event) {
    setName(event.target.value);
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => auth.signIn()}>Sign In</button>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
      <h1>Vite + React + Polybase</h1>
      <div className="card">
        <input
          type="text"
          onChange={handleInputChange}
          bind={name}
          value={name}
        />
        <br></br>
        <button onClick={() => create_record()}>Create record</button>
      </div>
      <div className="card">
        {users.length > 0 &&
          users.map((user) => {
            return <User user={user}></User>;
          })}
      </div>
    </div>
  );
}

export default App;
