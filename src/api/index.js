import axios from "axios";

const TRIVIA_API_URL = process.env.REACT_APP_TRIVIA_API_URL;

async function getCategories() {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${TRIVIA_API_URL}/api_category.php`,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

async function getQuestions(category = "", difficulty = "") {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${TRIVIA_API_URL}/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`,
    });

    return response.data.results;
  } catch (error) {
    return error.response.data;
  }
}

export { getCategories, getQuestions };
