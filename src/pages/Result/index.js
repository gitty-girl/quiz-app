import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { Button } from "@material-ui/core";

import styles from "./Result.module.css";

const Result = ({ score, setScore }) => {
  const history = useHistory();

  const handleRetake = () => {
    setScore(0);
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Final Score: {score}</h1>
      <Button
        variant="contained"
        size="large"
        color="primary"
        disableElevation
        onClick={handleRetake}
      >
        Take another Quiz
      </Button>
    </div>
  );
};

Result.propTypes = {
  score: PropTypes.number,
  setScore: PropTypes.func,
};

export default Result;
