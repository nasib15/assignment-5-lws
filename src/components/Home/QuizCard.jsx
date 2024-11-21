import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  const { id, thumbnail, is_attempted, title, description } = quiz;

  return (
    <Link
      to={`${is_attempted ? `/result/${id}` : `/quiz/${id}`}`}
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
    >
      {is_attempted ? (
        <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
          <div>
            <h1 className="text-3xl font-bold">Already Participated</h1>
            <p className="text-center">Click to view your leaderboard</p>
          </div>
        </div>
      ) : (
        <div className="group-hover:scale-105 absolute transition-all text-white w-full text-center top-1/2 -translate-y-1/2 px-4">
          <h1 className="text-5xl font-jaro">{title}</h1>
          <p className="mt-2 text-lg">{description}</p>
        </div>
      )}
      <img
        src={thumbnail}
        alt="JavaScript Hoisting"
        className="w-full h-full object-cover rounded mb-4"
      />
    </Link>
  );
};
export default QuizCard;
