import { Link } from "react-router-dom";
import { Icon, PlusIcon } from "../../components/SVG/Icon";

const AdminDashboard = () => {
  return (
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
  );
};
export default AdminDashboard;
