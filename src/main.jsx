import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";


const polybase = new Polybase({
  defaultNamespace: import.meta.env.VITE_REACT_NAMESPACE,
  signer: async (data) => {
    return {
      h: "eth-personal-sign",
      sig: await auth.ethPersonalSign(data),
    };
  },
});
const auth = new Auth();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PolybaseProvider polybase={polybase}>
      <AuthProvider auth={auth} polybase={polybase}>
        <App />
      </AuthProvider>
    </PolybaseProvider>
  </React.StrictMode>
);
