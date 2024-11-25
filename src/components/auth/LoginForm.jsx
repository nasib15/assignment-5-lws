import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    const { email, password } = formData;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email: email.trim(), password: password.trim() }
      );

      if (response.status === 200) {
        const { user, tokens } = response.data.data;
        if (tokens) {
          const accessToken = tokens?.accessToken;
          const refreshToken = tokens?.refreshToken;
          setAuth({ user, accessToken, refreshToken });

          toast.success("Logged in successfully");

          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Invalid username or password`,
      });
    }
  };

  // press enter to go to the next field
  const handleKeyDown = (e, nextFieldId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextField = document.getElementById(nextFieldId);

      if (nextField) {
        nextField.focus();
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Field
          label="Enter your email address"
          htmlFor="email"
          error={errors.email}
        >
          <input
            {...register("email", {
              required: "Email address is required",
            })}
            type="email"
            id="email"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Email address"
            onKeyDown={(e) => handleKeyDown(e, "password")}
          />
        </Field>
      </div>
      <div className="mb-6 relative">
        <Field
          label="Enter your Password"
          htmlFor="password"
          error={errors.password}
        >
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
            onKeyDown={(e) => handleKeyDown(e, null)}
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

      {/* removed the admin checkbox because in real life if any admins login into the system, it will be automatically logged in as admin */}

      <p className="mb-4 text-red-500">{errors?.root?.random?.message}</p>
      <button className="w-full bg-primary text-white py-3 rounded-lg mb-4">
        Sign in
      </button>
    </form>
  );
};
export default LoginForm;
