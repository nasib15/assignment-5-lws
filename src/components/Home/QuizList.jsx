import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { CardSkeleton } from "../common/Skeleton";
import QuizCard from "./QuizCard";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useAxios();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_URL}/quizzes`
        );
        const data = await response.data;
        setQuizzes(data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch quiz list"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [api]);

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (!quizzes?.length) {
    return (
      <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4">
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg">
          <h3 className="text-3xl font-bold text-gray-700 mb-3">
            No Quizzes Available
          </h3>
          <p className="text-gray-500 text-lg">
            Please check back later for new content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {quizzes?.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </>
  );
};
export default QuizList;
