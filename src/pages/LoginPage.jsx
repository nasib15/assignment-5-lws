/* eslint-disable react/no-unescaped-entities */
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import LoginBanner from "../assets/Saly-1.png";
import Logo from "../assets/logo.svg";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Quizzes | Login</title>
      </Helmet>
      <div className="bg-white text-gray-800 overflow-hidden">
        <div className="flex min-h-screen">
          <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
            <div className="text-white">
              <img src={LoginBanner} alt="Illustration" className="mx-auto" />

              <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
              <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
              <p className="mb-8">
                Logging in unlocks your personal progress tracker, letting you
                evaluate your performance and see how you stack up against
                others. Whether you're preparing for exams, improving your
                knowledge, or simply having fun, there's no better way to
                sharpen your mind.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
                <span>Welcome to</span>
                <img src={Logo} className="h-7" alt="logo" />
              </h2>
              <h1 className="text-5xl font-bold mb-8">Sign in</h1>

              <LoginForm />

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
    </>
  );
};
export default LoginPage;
