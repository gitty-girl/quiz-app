import { useHistory } from "react-router-dom";

import styles from "./Result.module.css";

const Result = ({ score }) => {
  const history = useHistory();

  const handleRetake = () => {
    history.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <h1>Final Score: {score}</h1>
      <button onClick={handleRetake}>Take another Quiz</button>
    </div>
  );
};

export default Result;
