import Logo from "../../assets/logo.svg";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-12">
      <img src={Logo} className="h-7" />
      <div>
        <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors">
          Login
        </button>

        <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors">
          Logout
        </button>
      </div>
    </header>
  );
};
export default Navbar;
