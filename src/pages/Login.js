import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import "../assets/styles/Login.scss";
import { firebaseAuth } from "../utils/firebase-config";

import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { email, password } = formValue;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi");
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/");
    }
  });

  return (
    <div className="login">
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  });
                }}
                value={formValue.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formValue.password}
              />
              <button onClick={handleLogin}>Login to your account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
