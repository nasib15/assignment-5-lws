/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import LoginBanner from "../assets/Saly-1.png";
import Logo from "../assets/logo.svg";

const LoginPage = () => {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
          <div className="text-white">
            <img src={LoginBanner} alt="Illustration" className="mx-auto" />

            <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
            <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
            <p className="mb-8">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you're preparing for exams, improving your knowledge, or
              simply having fun, there's no better way to sharpen your mind.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src={Logo} className="h-7" />
            </h2>
            <h1 className="text-5xl font-bold mb-8">Sign in</h1>

            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block mb-2">
                  Enter your username or email address
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Username or email address"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                  Enter your Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300"
                  placeholder="Password"
                />
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
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg mb-4"
              >
                Sign in
              </button>
            </form>

            <div className="text-center">
              <a href="#" className="text-primary">
                Forgot Password
              </a>
            </div>

            <div className="mt-8">
              <p className="text-center">
                No Account ?{" "}
                <Link to="/register" className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
