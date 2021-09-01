import { useEffect, useState } from "react";
import { getQuestions } from "../../api";

import handleShuffle from "../../helpers";

import { Question } from "../../components";

import styles from "./Quiz.module.css";

function Quiz({ selectedCategory, selectedDifficulty, score, setScore }) {
  const [questions, setQuestions] = useState([]);

  const [currentQuestionID, setCurrentQuestionID] = useState(0);

  const [options, setOptions] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(selectedCategory, selectedDifficulty);
    getQuestions(selectedCategory, selectedDifficulty)
      .then((data) => setQuestions(data))
      .catch((error) => setError(error.message))
      .finally(setLoading(false));
  }, [selectedCategory, selectedDifficulty]);

  useEffect(() => {
    if (questions.length > 0) {
      const shuffledOptions = handleShuffle([
        questions[currentQuestionID]?.correct_answer,
        ...questions[currentQuestionID]?.incorrect_answers,
      ]);

      setOptions(shuffledOptions);
    }
  }, [questions, currentQuestionID]);

  return (
    <div className={styles.wrapper}>
      Questions Page
      {error && <h1>{error}</h1>}
      {questions.length > 0 ? (
        <div>
          <div className={styles.quizInfo}>
            <span>Category: {questions[currentQuestionID].category}</span>
            {console.log(questions[currentQuestionID].category)}
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
            correct={questions[currentQuestionID]?.correct_answer}
          />
        </div>
      ) : (
        <div>LOading</div>
      )}
    </div>
  );
}

export default Quiz;
