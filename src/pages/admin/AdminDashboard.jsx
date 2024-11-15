import { Link } from "react-router-dom";
import Avatar from "../../assets/avater.webp";
import Logo from "../../assets/logo-white.svg";
import { Icon, PlusIcon } from "../../components/SVG/Icon";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <aside className="w-64 bg-primary p-6 flex flex-col">
        <div className="mb-10">
          <img src={Logo} className="h-7" />
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
              >
                Quizzes
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Settings
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Users
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Roles
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex items-center">
          <img
            src={Avatar}
            alt="Mr Hasan"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="text-white font-semibold">Saad Hasan</span>
        </div>
      </aside>

      <main className="flex-grow p-10">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
          <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/admin/quizset" className="group">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
              <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                <PlusIcon />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                Create a new quiz
              </h3>
              <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                Build from the ground up
              </p>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <Icon />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              JavaScript Basics Quiz
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              Test knowledge of core JavaScript
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <Icon />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              React Hooks Quiz
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              Test knowledge of core JavaScript
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group">
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <Icon />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              Backend vs. Frontend Quiz
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              Test knowledge of core JavaScript
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;
