import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Polybase } from "@polybase/client";
import { useAuth, usePolybase } from "@polybase/react";

function App() {
  const [count, setCount] = useState(0);
  const { auth, state, loading } = useAuth();
  const polybase = usePolybase();

  async function create_record() {
    await polybase.collection("User").create(["new-york3", "New-york2"]);
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => auth.signIn()}>Sign In</button>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => create_record()}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
