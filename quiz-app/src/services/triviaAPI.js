export const fetchQuizQuestions = async (categoryId, difficulty, amount) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch quiz questions. Please try again.');
    }

    const data = await response.json();

    if (data.response_code !== 0 || !data.results.length) {
      throw new Error('No questions available for the selected options.');
    }

    return data.results;
  } catch (error) {
    throw error;
  }
}
