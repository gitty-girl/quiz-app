import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { CircularProgress } from "@material-ui/core";

import { shuffleAnswers } from "../../helpers";
import { getQuestions } from "../../api";

import { ErrorMessage, Question, QuestionNotAvailable } from "../../components";

import styles from "./Quiz.module.css";

const Quiz = ({ selectedCategory, selectedDifficulty, score, setScore }) => {
  const [questions, setQuestions] = useState([]);
  const [questionsNotAvailable, setQuestionsNotAvailable] = useState(false);

  const [currentQuestionID, setCurrentQuestionID] = useState(0);

  const [options, setOptions] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentQuestion = useMemo(() => {
    return questions[currentQuestionID] || {};
  }, [questions, currentQuestionID]);

  useEffect(() => {
    getQuestions(selectedCategory, selectedDifficulty)
      .then((data) => {
        if (data.length === 0) {
          setQuestionsNotAvailable(true);
          return;
        }
        setQuestions(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
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
  }, [questions, currentQuestionID, currentQuestion]);

  if (loading) {
    return <CircularProgress color="secondary" size={50} />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (questionsNotAvailable) return <QuestionNotAvailable />;

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

Quiz.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  selectedDifficulty: PropTypes.string.isRequired,
  score: PropTypes.number,
  setScore: PropTypes.func,
};

export default Quiz;
