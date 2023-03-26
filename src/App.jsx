import { useState, useEffect } from "react";
import "./App.css";

import { useAuth, usePolybase } from "@polybase/react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const { auth } = useAuth();
  const polybase = usePolybase();
  const [users, setUsers] = useState([]);

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
    await polybase
      .collection("User")
      .create([uuidv4().toString(), "New-york2"]);
  }

  const User = ({ user }) => {
    return (
      <div className="card">
        <p>ID: {user.data?.id}</p>
        <p>Name: {user.data?.name}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <div>
        <button onClick={() => auth.signIn()}>Sign In</button>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
      <h1>Vite + React + Polybase</h1>
      <div className="card">
        <button onClick={() => create_record()}>count is</button>
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
