import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LeaderboardRow from "../components/leaderboard/LeaderboardRow";
import MyLeaderboardCard from "../components/leaderboard/MyLeaderboardCard";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import calculatePositionText from "../utils/calculatePositionText";
import calculateScore from "../utils/calculateResult";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [sortedLeaderboard, setSortedLeaderboard] = useState([]);

  console.log(leaderboardData);
  console.log(sortedLeaderboard);
  const { id } = useParams();
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_URL}/quizzes/${id}/attempts`
        );

        if (response.status === 200) {
          setLeaderboardData(response.data.data);

          // Sort attempts by points
          const sortedData = response.data.data.attempts.sort(
            (a, b) =>
              calculateScore(b.submitted_answers, b.correct_answers).score -
              calculateScore(a.submitted_answers, a.correct_answers).score
          );
          setSortedLeaderboard(sortedData);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch leaderboard"
        );
      }
    };

    fetchLeaderboard();
  }, [api, id]);

  // Find current user's data
  const currentUserData = sortedLeaderboard.find(
    (attempt) => attempt?.user?.id === auth?.user?.id
  );

  // Current user position
  const currentUserPosition =
    sortedLeaderboard.findIndex(
      (attempt) => attempt?.user?.id === auth?.user?.id
    ) + 1;

  return (
    <>
      <Helmet>
        <title>Quizzes | Leaderboard</title>
      </Helmet>
      <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentUserData && (
              <MyLeaderboardCard
                currentUserData={currentUserData}
                position={calculatePositionText(currentUserPosition)}
              />
            )}

            <div>
              <h1 className="text-2xl font-bold ml-2">Leaderboard</h1>
              <p className="mb-6 ml-2">{leaderboardData?.quiz?.title}</p>
              <ul className="space-y-4">
                {sortedLeaderboard.slice(0, 5).map((attempt, index) => (
                  <LeaderboardRow
                    key={attempt.id}
                    attempt={attempt}
                    position={calculatePositionText(index + 1)}
                    isCurrentUser={attempt.user.id === auth.user.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Leaderboard;
