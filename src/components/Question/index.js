import { useState } from "react";
import { useHistory } from "react-router";

import ErrorMessage from "../ErrorMessage";

import styles from "./Question.module.css";

const Question = ({
  score,
  setScore,
  questions,
  setQuestions,
  currentQuestionID,
  setCurrentQuestionID,
  options,
  correct,
}) => {
  const [error, setError] = useState(false);

  const [selected, setSelected] = useState();

  const history = useHistory();

  const isLastQuestion = currentQuestionID >= questions.length - 1;

  const handleSelect = (answer) => {
    if (answer === correct) {
      return "correct";
    }

    if (answer === selected && answer !== correct) {
      return "wrong";
    }
  };

  const handleCheck = (answer) => {
    setError(false);
    setSelected(answer);

    if (answer === correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      history.push("./result");
      return;
    }

    if (selected) {
      setCurrentQuestionID((prev) => prev + 1);
      setSelected();
    } else {
      setError("Please, select the option to continue...");
    }
  };

  const handleQuit = () => {
    // TODO: add confirmation question to avoid accidental clicks
    setCurrentQuestionID(0);
    setQuestions([]);
    setScore(0);

    history.push("/");
  };

  return (
    <div className={styles.question}>
      <h1>Question #{currentQuestionID + 1}</h1>

      <div>
        <h2>{questions[currentQuestionID].question}</h2>

        <div className={styles.options}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {!!options &&
            options.map((option) => (
              <button
                key={option}
                disabled={selected}
                className={`option ${selected && handleSelect(option)}`}
                onClick={() => handleCheck(option)}
              >
                {option}
              </button>
            ))}
        </div>

        <div className={styles.controls}>
          <button onClick={handleQuit}>Quit</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Question;
