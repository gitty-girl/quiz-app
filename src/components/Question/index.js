import { useState } from "react";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";

import ErrorMessage from "../ErrorMessage";
import { Modal, QuitConfirmationModal } from "../../components";

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
  const [showModal, toggleModal] = useState(false);

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
    setCurrentQuestionID(0);
    setQuestions([]);
    setScore(0);

    history.push("/");
  };

  return (
    <div className={styles.questionWrapper}>
      <h1 className={styles.title}>Question #{currentQuestionID + 1}</h1>

      <div className={styles.quizInfo}>
        <span>Category - {questions[currentQuestionID].category}</span>
        <span>Score - {score} </span>
      </div>

      <div>
        <h2 className={styles.question}>
          {questions[currentQuestionID].question}
        </h2>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className={styles.options}>
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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => toggleModal(true)}
          >
            Quit
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {isLastQuestion ? "Submit" : "Next"}
          </Button>

          {showModal && (
            <Modal>
              <QuitConfirmationModal
                toggleModal={toggleModal}
                handleQuit={handleQuit}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
