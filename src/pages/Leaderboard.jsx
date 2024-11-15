import Logo from "../assets/logo.svg";
import LeaderboardRow from "../components/Leaderboard/LeaderboardRow";
import MyLeaderboardCard from "../components/Leaderboard/MyLeaderboardCard";

const Leaderboard = () => {
  return (
    <div className="bg-[#F5F3FF]  p-4">
      <header className="flex justify-between items-center">
        <img src={Logo} className="h-7" />
        <div>
          <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors font-jaro">
            Login
          </button>

          <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors font-jaro">
            Logout
          </button>
        </div>
      </header>

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
    </div>
  );
};
export default Leaderboard;
