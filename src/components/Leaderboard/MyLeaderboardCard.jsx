import Profile from "../../assets/profile.png";
import calculateResult from "../../utils/calculateResult";

const MyLeaderboardCard = ({ currentUserData, position }) => {
  const { score, correct, wrong } = calculateResult(
    currentUserData?.submitted_answers,
    currentUserData?.correct_answers
  );

  return (
    <div className="bg-primary rounded-lg p-6 text-white">
      <div className="flex flex-col justify-center items-center gap-2 mb-4">
        <div className="size-16 rounded-full bg-primary/20 grid place-items-center ">
          <img
            src={Profile}
            alt="name"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h2 className="text-2xl font-bold">{currentUserData.user.full_name}</h2>
        <p className="text-xl">{position} Position</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm opacity-75">Points</p>
          <p className="text-2xl font-bold">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Correct</p>
          <p className="text-2xl font-bold">{correct}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Wrong</p>
          <p className="text-2xl font-bold">{wrong}</p>
        </div>
      </div>
    </div>
  );
};

export default MyLeaderboardCard;
