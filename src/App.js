import "./App.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import Button from "@mui/material/Button";
import { FacebookAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  };

  const handleFbSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log("fb user",user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

      });
  };
  return (
    <div className="App">
      <br />
      <Button variant="contained" onClick={handleGoogleSignIn}>
        Sign in with google
      </Button>
      {user.email && <h3>Your Email: {user.email}</h3>}
      <img src={user.photoURL} alt="" />

      <br />
      <br />
      <Button variant="outlined" onClick={handleFbSignIn}>
        Sign in with Facebook
      </Button>
    </div>
  );
}

export default App;
