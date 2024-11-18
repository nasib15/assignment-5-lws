import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import hideIcon from "../../assets/hide.png";
import showIcon from "../../assets/view.png";
import Field from "./Field";

const RegistrationForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (formData) => {
    const { full_name, email, password, confirm_password, admin } = formData;
    if (password !== confirm_password) {
      setError("password", {
        message: "Passwords do not match",
      });
      return;
    }

    try {
      if (admin) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          { full_name, email, password, role: "admin" }
        );
        if (response.status === 201) {
          navigate("/login");
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          { full_name, email, password }
        );
        if (response.status === 201) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-4">
          <Field label="Full Name" htmlFor="full_name" error={errors.full_name}>
            <input
              {...register("full_name", {
                required: "Full name is required",
              })}
              type="text"
              id="full_name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.full_name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
          </Field>
        </div>

        <div className="mb-4">
          <Field label="Email" htmlFor="email" error={errors.email}>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="text"
              id="email"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email address"
            />
          </Field>
        </div>
      </div>

      <div className="flex  gap-4">
        <div className="mb-6 relative">
          <Field
            label="Enter your Password"
            htmlFor="password"
            error={errors.password}
          >
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300 "
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

        <div className="mb-6 relative">
          <Field
            label="Confirm Password"
            htmlFor="confirm_password"
            error={errors.confirm_password}
          >
            <input
              {...register("confirm_password", {
                required: "Confirm password is required",
              })}
              type={showPassword ? "text" : "password"}
              id="confirm_password"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.confirm_password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm Password"
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
      </div>

      <div className="mb-3 flex gap-2 items-center">
        <input
          {...register("admin")}
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" className="block ">
          Register as Admin
        </label>
      </div>
      <p className="text-red-500 text-sm mb-4">
        {errors.root?.random?.message}
      </p>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-2"
      >
        Create Account
      </button>
    </form>
  );
};
export default RegistrationForm;
