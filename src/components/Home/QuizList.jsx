import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import QuizCard from "./QuizCard";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
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
      }
    };
    fetchQuizzes();
  }, [api]);

  return (
    <>
      {quizzes?.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </>
  );
};
export default QuizList;
