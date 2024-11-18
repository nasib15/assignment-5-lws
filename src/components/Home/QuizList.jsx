import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import QuizCard from "./QuizCard";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes`);
        const data = await response.json();
        setQuizzes(data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch quiz list"
        );
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <>
      {quizzes?.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </>
  );
};
export default QuizList;
