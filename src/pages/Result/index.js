import { useHistory } from "react-router-dom";
import styles from "./Result.module.css";

function Result({ score }) {
  const history = useHistory();

  const handleRetake = () => {
    history.push("/");
  };
  return (
    <div className={styles.wrapper}>
      <h1>Final Score: {score}</h1>
      <button onClick={handleRetake}>Retake Quiz</button>
    </div>
  );
}

export default Result;
