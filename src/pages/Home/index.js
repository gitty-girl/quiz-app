import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";

import { DIFFICULTIES } from "../../constants";
import { getCategories } from "../../api";
import { ErrorMessage } from "../../components";

import styles from "./Home.module.css";

const Home = ({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.trivia_categories))
      .catch((error) => setError(error.message))
      .finally(setLoading(false));
  }, []);

  const handleSubmit = () => {
    if (!selectedCategory || !selectedDifficulty) {
      setError(true);
    } else {
      history.push("/quiz");
    }
  };

  if (loading) {
    return <CircularProgress color="secondary" className="spinner" size={50} />;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Quiz Settings</h1>

      {error && (
        <ErrorMessage>Please, fill all the fields to continue...</ErrorMessage>
      )}

      <FormControl variant="outlined" className={styles.selectWrapper}>
        <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
        <Select
          native
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Category"
          inputProps={{
            name: "category",
            id: "outlined-catgegory-native-simple",
            style: { textTransform: "capitalize" },
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

      <FormControl variant="outlined" className={styles.selectWrapper}>
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
            style: { textTransform: "capitalize" },
          }}
          className={styles.select}
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

Home.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  selectedDifficulty: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func,
  setSelectedDifficulty: PropTypes.func,
};

export default Home;
