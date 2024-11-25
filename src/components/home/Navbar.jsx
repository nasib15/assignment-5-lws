import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import ProfilePic from "../../assets/profile.png";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const { user } = auth;

  const isAdmin = user?.role === "admin";

  return (
    <header className="flex justify-between items-center mb-8">
      <Link to="/">
        <img src={Logo} className="h-7" alt="logo" />
      </Link>
      <div className="flex items-center gap-3">
        {auth?.user ? (
          <>
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors font-jaro"
              >
                Dashboard
              </Link>
            )}
            <button>
              <img
                src={ProfilePic}
                className="w-10 h-10 rounded-full"
                alt="profile"
              />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors font-jaro"
          >
            Login
          </Link>
        )}

        <button
          className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors font-jaro"
          onClick={() => setAuth({})}
        >
          Logout
        </button>
      </div>
    </header>
  );
};
export default Navbar;
