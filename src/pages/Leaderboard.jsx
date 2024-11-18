import LeaderboardRow from "../components/leaderboard/LeaderboardRow";
import MyLeaderboardCard from "../components/leaderboard/MyLeaderboardCard";

const Leaderboard = () => {
  return (
    <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <MyLeaderboardCard />

          <div>
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p className="mb-6">React Hooks Quiz</p>
            <ul className="space-y-4">
              <LeaderboardRow />
              <LeaderboardRow />
              <LeaderboardRow />
              <LeaderboardRow />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Leaderboard;
