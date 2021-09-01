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

  const handleSelect = (i) => {
    console.log(i);
    if (selected === i && selected === correct) {
      return "correct";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "correct";
    }
  };

  const handleCheck = (i) => {
    console.log("in handleCheck", i);
    setSelected(i);
    if (i === correct) setScore((prev) => prev + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currentQuestionID > 8) {
      history.push("./result");
    } else if (selected) {
      setCurrentQuestionID(currentQuestionID + 1);
      setSelected();
    } else {
      setError("Please, select the option to continue...");
    }
  };

  const handleQuit = () => {
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

          {console.log({ options })}
          {console.log({ correct })}
          {console.log({ selected })}
          {console.log(correct === selected)}

          {options &&
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
