import Profile from "../../assets/profile.png";
import calculateResult from "../../utils/calculateResult";

const LeaderboardRow = ({ attempt, position, isCurrentUser }) => {
  return (
    <li
      className={`flex items-center justify-between rounded-lg p-1 px-2 hover:bg-primary/10 transition-all hover:cursor-pointer ${
        isCurrentUser ? "bg-primary/10" : ""
      }`}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary/20 grid place-items-center mr-4">
          <img
            src={Profile}
            alt="name"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="font-semibold">{attempt.user.full_name}</h3>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="font-semibold">
          {
            calculateResult(attempt.submitted_answers, attempt.correct_answers)
              .score
          }{" "}
          points
        </span>
      </div>
    </li>
  );
};

export default LeaderboardRow;
