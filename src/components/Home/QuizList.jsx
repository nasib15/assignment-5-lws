import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes`);
      const data = await response.json();
      setQuizzes(data.data);
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
