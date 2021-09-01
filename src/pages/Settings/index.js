import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { DIFFICULTIES } from "../../constants/";
import { getCategories } from "../../api";
import { ErrorMessage } from "../../components";

import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";

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
    <section className={styles.container}>
      <h1 className={styles.title}>Quiz Settings</h1>

      {loading && <CircularProgress variant="determinate" value={100} />}

      {error && (
        <ErrorMessage>Please, fill all the fields to continue...</ErrorMessage>
      )}

      <FormControl variant="outlined" className={styles.select}>
        <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
        <Select
          native
          // value={state.age}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Select Category"
          inputProps={{
            name: "category",
            id: "outlined-catgegory-native-simple",
          }}
        >
          <option aria-label="None" value="" />

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={styles.select}>
        <InputLabel htmlFor="outlined-difficulty-native-simple">
          Difficulty
        </InputLabel>
        <Select
          native
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          label="Difficulty"
          inputProps={{
            name: "difficulty",
            id: "outlined-difficulty-native-simple",
          }}
        >
          <option aria-label="None" value="" />

          {DIFFICULTIES.map((item) => (
            <option key={item.id} value={item.name} className={styles.option}>
              {item.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
        disableElevation
      >
        Start
      </Button>
    </section>
  );
};

export default Settings;
