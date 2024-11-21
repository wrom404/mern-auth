import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { login, guardLogin } = useAuthStore();

  useEffect(() => {
    const handleEffect = async () => {
      const response = await guardLogin();
      if (!response.success) {
        toast.error(response.message);
        navigate("/dashboard");
      }
    };
    handleEffect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    const response = await login(email, password);

    if (response?.data?.success) {
      setData({});
      toast.success(response?.data?.message);
      navigate("/dashboard");
    } else {
      toast.error(response);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950 bg-opacity-95">
      <div className="p-4 max-w-md w-full border border-gray-800 rounded-xl bg-gray-950 bg-opacity-95">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-gray-200 text-xl text-center font-semibold">Login</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email || ""}
              type="text"
              className="input input-bordered bg-transparent"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              value={data.password || ""}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              className="input input-bordered bg-transparent"
            />
          </div>

          <div className="form-control pt-4 mb-2">
            <button
              className="btn btn-primary font-semibold text-lg"
              type="submit"
            >
              login
            </button>
            <p className="text-sm text-gray-500 my-2">
              don't have an account?{" "}
              <Link
                className="text-blue-500 hover:text-blue-400"
                to={"/signup"}
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
