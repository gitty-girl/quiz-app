import { useEffect, useState } from "react";

import { CircularProgress } from "@material-ui/core";

import { shuffleAnswers } from "../../helpers";
import { getQuestions } from "../../api";

import { ErrorMessage, Question, QuestionNotAvailable } from "../../components";

import styles from "./Quiz.module.css";

const entities = {
  "&#039;": "'",
  "&quot;": '"',
  // add more if needed
};

const Quiz = ({ selectedCategory, selectedDifficulty, score, setScore }) => {
  const [questions, setQuestions] = useState([]);

  const [currentQuestionID, setCurrentQuestionID] = useState(0);

  const [options, setOptions] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentQuestion = questions[currentQuestionID] || {};

  useEffect(() => {
    getQuestions(selectedCategory, selectedDifficulty)
      .then((data) => setQuestions(data))
      .catch((error) => setError(error.message))
      .finally(setLoading(false));
  }, [selectedCategory, selectedDifficulty]);

  useEffect(() => {
    if (questions.length > 0) {
      const { correct_answer, incorrect_answers } = currentQuestion;

      const shuffledAnswers = shuffleAnswers([
        correct_answer,
        ...incorrect_answers,
      ]);

      setOptions(shuffledAnswers);
    } else {
      console.log("something should be added");
    }
  }, [questions, currentQuestionID]);

  if (loading) {
    return <CircularProgress color="secondary" className="spinner" size={50} />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  // if (questions.length <= 0) return <QuestionNotAvailable />;

  return (
    <div className={styles.wrapper}>
      {questions.length > 0 && (
        <Question
          score={score}
          setScore={setScore}
          questions={questions}
          setQuestions={setQuestions}
          currentQuestionID={currentQuestionID}
          setCurrentQuestionID={setCurrentQuestionID}
          options={options}
          correct={currentQuestion.correct_answer}
        />
      )}
    </div>
  );
};

export default Quiz;
