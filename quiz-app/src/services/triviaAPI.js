import axios from 'axios';

export const fetchQuizQuestions = async (category, difficulty, amount) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const { data } = await axios.get(endpoint);

  return data.results.map((question) => ({
    ...question,
    answers: [question.correct_answer, ...question.incorrect_answers],
  }));
};
