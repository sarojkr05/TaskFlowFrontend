import { useState } from "react";
import { useDispatch } from "react-redux"
import { useLoginMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Login from "./Login";

function LoginContainer() {
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await login(formData).unwrap();
        console.log("login res", res)
        dispatch(setCredentials(res));
        toast.success("Login successful!");
          console.log(res)
        // Navigate to dashboard or login
        setTimeout(() => navigate('/'), 1500)
      } catch (error) {
        console.error("Login failed:", error);
        toast.error(error?.data?.message || "Login failed");
      }
    };
  return (
    <Login 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
      isLoading={isLoading}
    />
  )
}

export default LoginContainer
