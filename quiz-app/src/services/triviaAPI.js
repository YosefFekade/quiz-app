// Function for fetching quiz questions from Open Trivia Database based on the user's selection.
export const fetchQuizQuestions = async (categoryId, difficulty, amount) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch quiz questions. Please try again.')
    }

    const data = await response.json()

    return data.results
    
  } catch (error) {
    throw error
  }
}
