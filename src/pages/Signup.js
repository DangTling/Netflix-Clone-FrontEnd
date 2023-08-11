import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import "../assets/styles/Signup.scss";
import { firebaseAuth } from "../utils/firebase-config";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { email, password } = formValue;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      toast.success("Đăng Ký Thành Công");
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
    <div className="signup" showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValue.email}
              onChange={(e) =>
                setFormValue({ ...formValue, [e.target.name]: e.target.value })
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValue.password}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <button
                onClick={() => {
                  setShowPassword(true);
                }}
              >
                Get Started
              </button>
            )}
          </div>
          <button onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
