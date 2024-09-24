import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from './services/triviaAPI';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import ScoreSummary from './components/ScoreSummary';
import QuizHistory from './components/QuizHistory';
import './index.css'

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [categories, setCategories] = useState([]);
  const [history, setHistory] = useState([]);

  // Load the quiz history from localStorage when the app starts
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    // Fetch available categories from the API
    const fetchCategories = async () => {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const startQuiz = async (category, difficulty, amount) => {
    const fetchedQuestions = await fetchQuizQuestions(category, difficulty, amount);
    setQuestions(fetchedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStarted(true);
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    // Save the result to the history in localStorage
    const newEntry = {
      topic: categories.find((cat) => cat.id === questions[0].category).name,
      score: score + (questions[currentQuestionIndex].correct_answer === questions[currentQuestionIndex].correct_answer ? 1 : 0),
      total: questions.length,
      date: new Date().toLocaleString(),
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));

    setQuizStarted(false); // Quiz is finished
  };

  const retakeQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
  };

  return (
    <div className="container mx-auto p-4">
      {!quizStarted && questions.length === 0 ? (
        <>
          <QuizStart categories={categories} onStartQuiz={startQuiz} />
          {history.length > 0 && <QuizHistory history={history} />}
        </>
      ) : !quizStarted ? (
        <ScoreSummary score={score} total={questions.length} onRetakeQuiz={retakeQuiz} />
      ) : (
        <QuestionCard question={questions[currentQuestionIndex]} onAnswerSelect={handleAnswerSelect} />
      )}
    </div>
  );
}

export default App;