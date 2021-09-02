import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import styles from "./QuestionNotAvailable.module.css";

const QuestionNotAvailable = () => {
  const history = useHistory();

  const handleRetake = () => {
    history.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>
        Sorry, there are not questions in this category yet.
      </p>

      <Button
        variant="contained"
        size="large"
        color="primary"
        disableElevation
        onClick={handleRetake}
      >
        Try another category
      </Button>
    </div>
  );
};

export default QuestionNotAvailable;
