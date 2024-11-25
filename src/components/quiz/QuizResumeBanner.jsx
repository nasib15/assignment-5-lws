/* eslint-disable react/no-unescaped-entities */
import { TimeIcon } from "../SVG/Icon";

const QuizResumeBanner = ({ savedProgress, onResume, onStartNew }) => {
  if (!savedProgress) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-xl shadow-sm border border-blue-100/50 p-6 mb-6">
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start space-x-4">
          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100/80 text-blue-600">
            <TimeIcon />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Resume Your Quiz
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              We've saved your progress. Would you like to continue where you
              left off?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onStartNew}
            className="flex-1 sm:flex-initial px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 focus:outline-none"
          >
            Start New
          </button>
          <button
            onClick={onResume}
            className="flex-1 sm:flex-initial px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow focus:outline-none"
          >
            Resume Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResumeBanner;
