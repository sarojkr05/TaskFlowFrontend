import { useState } from "react";
import { useDispatch } from "react-redux";
import Signup from "./Signup";
import { useRegisterMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const res = await register(formData).unwrap();
      dispatch(setCredentials(res));
      toast.success("Signup successful!");
        console.log(res)
      // Navigate to dashboard or login
      setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error?.data?.message || "Signup failed");
    }
  };

  return (
    <Signup
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default SignupContainer;
