import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from './services/triviaAPI';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import ScoreSummary from './components/ScoreSummary';
import QuizHistory from './components/QuizHistory';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Track user's answers
  const [categories, setCategories] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(''); // Track selected category name

  // Load quiz history from local storage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    setHistory(storedHistory);
  }, []);

  // Fetch categories from Open Trivia API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  // Start the quiz based on selected category, difficulty, and number of questions
  const startQuiz = async (categoryId, categoryName, difficulty, amount) => {
    const fetchedQuestions = await fetchQuizQuestions(categoryId, difficulty, amount);
    setQuestions(fetchedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]); // Reset user answers
    setSelectedCategoryName(categoryName); // Store the selected category name
    setQuizStarted(true);
  };

  // Handle answer selection
  const handleAnswerSelect = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    // Record the user's answer
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

    // Update score if the answer is correct
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question or finish the quiz
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  // Finish the quiz and store the result in history
  const finishQuiz = () => {
    const newEntry = {
      topic: selectedCategoryName, // Use the stored category name
      score,
      total: questions.length,
      date: new Date().toLocaleString(),
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));

    setQuizStarted(false); // Stop quiz mode and show the score summary
  };

  // Reset the quiz and allow the user to start over
  const retakeQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
  };

  // Clear the history of previous quizzes
  const clearHistory = () => {
    localStorage.removeItem('quizHistory');
    setHistory([]);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Case 1: No quiz started and no quiz completed */}
      {!quizStarted && questions.length === 0 ? (
        <>
          {/* QuizStart component with the search bar for quiz topics */}
          <QuizStart categories={categories} onStartQuiz={startQuiz} />
          {/* If quiz history exists, display it */}
          {history.length > 0 && <QuizHistory history={history} clearHistory={clearHistory} />}
        </>
      ) : /* Case 2: Quiz has ended, show score summary */
      !quizStarted && questions.length > 0 ? (
        <ScoreSummary
          score={score}
          total={questions.length}
          questions={questions}
          userAnswers={userAnswers}
          onRetakeQuiz={retakeQuiz}
        />
      ) : /* Case 3: Quiz is ongoing, display question card */
      (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          score={score}
        />
      )}
    </div>
  );
}

export default App;
