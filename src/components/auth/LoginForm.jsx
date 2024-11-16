import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import hideIcon from "../../assets/hide.png";
import showIcon from "../../assets/view.png";
import useAuth from "../../hooks/useAuth";
import Field from "./Field";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { user, tokens } = response.data.data;
        if (tokens) {
          const authToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;
          setAuth({ user, authToken, refreshToken });

          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Field
          label="Enter your username or email address"
          error={errors.email}
        >
          <input
            {...register("email", {
              required: "Username or email address is required",
            })}
            type="text"
            id="email"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Username or email address"
          />
        </Field>
      </div>
      <div className="mb-6 relative">
        <Field label="Enter your Password" error={errors.password}>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type={showPassword ? "text" : "password"}
            id="password"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Password"
          />
          <div className="absolute top-12 right-3 cursor-pointer">
            <img
              src={showPassword ? hideIcon : showIcon}
              alt="show password"
              onClick={togglePasswordVisibility}
            />
          </div>
        </Field>
      </div>
      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" className="block ">
          Login as Admin
        </label>
      </div>
      <p className="mb-4 text-red-500">{errors?.root?.random?.message}</p>
      <button className="w-full bg-primary text-white py-3 rounded-lg mb-4">
        Sign in
      </button>
    </form>
  );
};
export default LoginForm;
