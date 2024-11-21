import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";


const Home = () => {
  const { guardHomepage } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEffect = async () => {
      const response = await guardHomepage();
      if (!response.success) {
        toast.error(response.message);
        navigate("/dashboard");
      }
    };
    handleEffect();
  }, []);
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-950 opacity-95 text-gray-200">
      <span className="text-3xl text-gray-200">Welcome!!!</span>
      <span className="text-gray-200 text-xl">This website includes authentication and authorization features, with a focus on implementing token-based security using JWT (JSON Web Tokens).</span>
    </div>
  );
};

export default Home;
