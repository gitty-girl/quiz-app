import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { DIFFICULTIES } from "../../constants/";
import { getCategories } from "../../api";
import { ErrorMessage } from "../../components";

import styles from "./Settings.module.css";

const Settings = ({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.trivia_categories))
      .catch((error) => setError(error.message))
      .finally(setLoading(false));
  }, []);

  const handleSubmit = () => {
    console.log({ selectedCategory, selectedDifficulty });
    if (!selectedCategory || !selectedDifficulty) {
      setError(true);
      return;
    } else {
      history.push("/quiz");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz Settings</h1>

      {error && (
        <ErrorMessage>Please, fill all the fields to continue...</ErrorMessage>
      )}

      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSelectedDifficulty(e.target.value)}>
        {DIFFICULTIES.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Start Quiz</button>
    </div>
  );
};

export default Settings;
