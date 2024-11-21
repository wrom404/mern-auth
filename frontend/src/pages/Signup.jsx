import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signUp, guardSignup } = useAuthStore();

  useEffect(() => {
    const handleEffect = async () => {
      const response = await guardSignup();
      if (!response.success) {
        toast.error(response.message);
        navigate("/dashboard");
      }
    };
    handleEffect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    const response = await signUp(name, email, password);
    if (response.data.success) {
      setData({});
      toast.success(response?.data?.message);
      navigate("/login");
    } else {
      toast.error(response.data.error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950 bg-opacity-95">
      <div className="p-4 max-w-md w-full border border-gray-800 rounded-xl bg-gray-950 bg-opacity-95">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h3 className="text-gray-200 text-xl text-center font-semibold">Signup</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              className="input input-bordered bg-transparent"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
              type="text"
              className="input input-bordered bg-transparent"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              value={data.password}
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
              signup
            </button>
            <p className="text-sm text-gray-500 my-2">
              already have an account?{" "}
              <Link className="text-blue-500 hover:text-blue-400" to={"/login"}>
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
