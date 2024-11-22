import { PlusDocumentIcon } from "../SVG/Icon";

const QuizSetFallback = () => {
  return (
    <div className="bg-white rounded-lg p-8 text-center border border-gray-100 shadow-sm">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <PlusDocumentIcon />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Questions Added Yet
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Get started by creating your first question. Use the form on the left to
        add questions to this quiz set.
      </p>
      <div className="inline-flex items-center text-sm text-primary">
        <span className="mr-2">↑</span>
        Start by filling out the question form
      </div>
    </div>
  );
};
export default QuizSetFallback;
