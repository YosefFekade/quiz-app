import axios from 'axios';

export const fetchQuizQuestions = async (category, difficulty, amount = 10) => {
  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch quiz questions');
  }
};