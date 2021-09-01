import { useEffect, useState } from "react";

import { shuffleAnswers } from "../../helpers";
import { getQuestions } from "../../api";

import { ErrorMessage, Question } from "../../components";

import styles from "./Quiz.module.css";

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
    }
  }, [questions, currentQuestionID]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className={styles.wrapper}>
      Questions Page
      {error && <ErrorMessage>Choose option</ErrorMessage>}
      {questions.length > 0 && (
        <div>
          <div className={styles.quizInfo}>
            <span>Category: {currentQuestion.category}</span>
            <span> Score: {score} </span>
          </div>

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
        </div>
      )}
    </div>
  );
};

export default Quiz;
