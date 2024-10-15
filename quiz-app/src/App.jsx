import React, { useState, useEffect } from 'react'
import { fetchQuizQuestions } from './services/triviaAPI'
import QuizStart from './components/QuizStart'
import QuestionCard from './components/QuestionCard'
import ScoreSummary from './components/ScoreSummary'
import QuizHistory from './components/QuizHistory'
import Logo from './components/logo'
import Footer from './components/footer'
import Header from './components/header'

// glasmorphism for all the divs
function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [categories, setCategories] = useState([])
  const [history, setHistory] = useState([])
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [selectedDifficulty,selectedsetDifficulty]= useState('')
  const [error, setError] = useState(null) // Track error state
  const [theme, setTheme] = useState('light') // Light by default

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || []
    setHistory(storedHistory)
  }, [])

  // Fetching catagories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php')
        const data = await response.json()
        setCategories(data.trivia_categories)
      } catch (error) {
        setError('Failed to load quiz categories. Please try again.')
      }
    }
    fetchCategories()
  }, []) 

// Logic to triger the question card , function sent as a prop to Question start
  const startQuiz = async (categoryId, categoryName, difficulty, amount) => {  
    try {
      const fetchedQuestions = await fetchQuizQuestions(categoryId, difficulty, amount); //goes to triviaAPI to recive questions based on users input
      
      if (fetchedQuestions.length === 0) {
        throw new Error('No questions available for the selected options.')
      }

      setQuestions(fetchedQuestions)
      setCurrentQuestionIndex(0)
      setScore(0)
      setUserAnswers([])
      setSelectedCategoryName(categoryName)
      selectedsetDifficulty(difficulty)
      setQuizStarted(true)
      setError(null) // Clear any previous errors
    } catch (error) {
      setError(error.message || 'Failed to fetch quiz questions. Please try again.')
    }
  }

 //This function is used to handel the user’s selection.
  const handleAnswerSelect = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer

    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer])

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1)
    }

    if (currentQuestionIndex + 1 < questions.length) { //checks the current index of the question with that the total of the total number of questions 
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    const newEntry = {
      topic: selectedCategoryName,
      difficulty:selectedDifficulty, 
      score,
      total: questions.length,
    }

    const updatedHistory = [...history, newEntry] // This will create an array with of old history and the new entry to one array to be set.
    setHistory(updatedHistory)
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory))

    setQuizStarted(false)
  }

  const retakeQuiz = () => {
    setQuizStarted(false)
    setQuestions([])
    setError(null) // Reset error state when restarting
  }

  const clearHistory = () => {
    localStorage.removeItem('quizHistory')
    setHistory([])
  }
  
  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.add(savedTheme)
    }
  }, [])

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(newTheme)
    localStorage.setItem('theme', newTheme) // Save preference in localStorage
  }

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} bg-gradient-to-r from-blue-300 to-teal-600 `}>
      <Header />
      <div className=" p-4 dark:bg-gradient-to-r from-gray-900 to-gray-700 text-gray-900 dark:text-gray-100 min-h-screen">
          {/* Dark mode toggle button */}
          <div className="p-4 flex justify-end">
            {/* change button to a toggle  */}
            <button
              onClick={toggleTheme}
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-colors"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

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
              <Logo />
             <div className="flex justify-center">
              <div className="w-full  lg:max-w-3xl xl:max-w-4xl p-4">
                <QuizStart categories={categories} onStartQuiz={startQuiz} />
              </div>
            </div>
              {history.length > 0 && (
              <div className=" p-4 rounded-lg dark:bg-gray-800"> 
                <QuizHistory history={history} clearHistory={clearHistory} />
              </div>
            )}
              
            </>
          ) : !quizStarted && questions.length > 0 && !error ? (
            <div className="flex justify-center">
              <div className="w-full  lg:max-w-3xl xl:max-w-4xl p-4">
            <ScoreSummary
              score={score}
              total={questions.length}
              questions={questions}
              userAnswers={userAnswers}
              onRetakeQuiz={retakeQuiz}
            />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-full  lg:max-w-3xl xl:max-w-4xl p-4">
            <QuestionCard
              question={questions[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              score={score}
            />
              </div>
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
