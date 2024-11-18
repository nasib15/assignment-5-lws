import { Link } from "react-router-dom";
import { BackIcon } from "../../components/SVG/Icon";

const QuizSetPage = () => {
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
            >
              <BackIcon />
              Back to home
            </Link>

            <h2 className="text-3xl font-bold mb-6">
              Give your quiz title and description
            </h2>

            <form>
              <div className="mb-4">
                <label
                  htmlFor="quiz-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quiz title
                </label>
                <input
                  type="text"
                  id="quiz-title"
                  name="quiz-title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                  placeholder="Quiz"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="quiz-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="quiz-description"
                  name="quiz-description"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                  placeholder="Description"
                ></textarea>
              </div>

              <a
                href="./quiz_set_entry_page.html"
                type="submit"
                className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Next
              </a>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default QuizSetPage;
