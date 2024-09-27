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
  const [userAnswers, setUserAnswers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        setError('Failed to load quiz categories. Please try again.');
      }
    };
    fetchCategories();
  }, []);

  const startQuiz = async (categoryId, categoryName, difficulty, amount) => {
    try {
      const fetchedQuestions = await fetchQuizQuestions(categoryId, difficulty, amount);
      
      if (fetchedQuestions.length === 0) {
        throw new Error('No questions available for the selected options.');
      }

      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setUserAnswers([]);
      setSelectedCategoryName(categoryName);
      setQuizStarted(true);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message || 'Failed to fetch quiz questions. Please try again.');
    }
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const newEntry = {
      topic: selectedCategoryName,
      score,
      total: questions.length,
      date: new Date().toLocaleString(),
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));

    setQuizStarted(false);
  };

  const retakeQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
    setError(null); // Reset error state when restarting
  };

  const clearHistory = () => {
    localStorage.removeItem('quizHistory');
    setHistory([]);
  };

  return (
    <div className="container mx-auto p-4">
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute right-0 top-0 mt-2 mr-2"
            onClick={() => setError(null)}
          >
            <span>&times;</span>
          </button>
        </div>
      ) : null}

      {!quizStarted && questions.length === 0 && !error ? (
        <>
          <QuizStart categories={categories} onStartQuiz={startQuiz} />
          {history.length > 0 && <QuizHistory history={history} clearHistory={clearHistory} />}
        </>
      ) : !quizStarted && questions.length > 0 && !error ? (
        <ScoreSummary
          score={score}
          total={questions.length}
          questions={questions}
          userAnswers={userAnswers}
          onRetakeQuiz={retakeQuiz}
        />
      ) : (
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
