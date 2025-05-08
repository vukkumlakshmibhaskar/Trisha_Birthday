import React, { useState } from 'react';
import { HelpCircle as CircleHelp, Trophy, Star, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  
  const questions: Question[] = [
    {
      id: 1,
      text: "What's Sarah's favorite color?",
      options: ["Blue", "Purple", "Pink", "Green"],
      correctAnswer: 2
    },
    {
      id: 2,
      text: "What's Sarah's favorite food?",
      options: ["Pizza", "Sushi", "Pasta", "Tacos"],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "Where would Sarah most like to travel?",
      options: ["Paris", "Tokyo", "New York", "Bali"],
      correctAnswer: 3
    },
    {
      id: 4,
      text: "What's Sarah's favorite movie genre?",
      options: ["Romance", "Comedy", "Action", "Horror"],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "What's Sarah's dream job?",
      options: ["Doctor", "Teacher", "Artist", "Entrepreneur"],
      correctAnswer: 2
    }
  ];
  
  const handleOptionClick = (optionIndex: number) => {
    if (answeredQuestions.includes(currentQuestion)) return;
    
    setSelectedAnswer(optionIndex);
    
    const newAnsweredQuestions = [...answeredQuestions, currentQuestion];
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    // Automatically move to next question after a delay
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 1500);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };
  
  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage === 100) {
      return "Wow! You know Sarah perfectly! You must be her best friend!";
    } else if (percentage >= 80) {
      return "Great job! You know Sarah very well!";
    } else if (percentage >= 60) {
      return "Not bad! You know some things about Sarah.";
    } else if (percentage >= 40) {
      return "You could get to know Sarah a bit better!";
    } else {
      return "Hmm, you might need to spend more time with Sarah!";
    }
  };

  return (
    <section id="quiz" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <CircleHelp className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800">How Well Do You Know Sarah?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take this fun quiz to see if you really know the birthday girl!
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-purple-500"></div>
          
          {!showResult ? (
            <div>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-1">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Question */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {questions[currentQuestion].text}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === questions[currentQuestion].correctAnswer;
                    const isAnswered = answeredQuestions.includes(currentQuestion);
                    
                    let className = "p-4 border rounded-lg text-left w-full transition-all duration-300 flex items-center";
                    
                    if (isAnswered) {
                      if (isSelected) {
                        className += isCorrect 
                          ? " bg-green-100 border-green-300 text-green-800" 
                          : " bg-red-100 border-red-300 text-red-800";
                      } else if (isCorrect) {
                        className += " bg-green-100 border-green-300 text-green-800";
                      } else {
                        className += " opacity-50 border-gray-200";
                      }
                    } else {
                      className += " border-gray-200 hover:border-pink-300 hover:bg-pink-50";
                    }
                    
                    return (
                      <button
                        key={index}
                        className={className}
                        onClick={() => handleOptionClick(index)}
                        disabled={isAnswered}
                      >
                        <span className="flex-grow">{option}</span>
                        {isAnswered && isCorrect && (
                          <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-red-600 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="mb-6">
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
                <p className="text-xl text-gray-600 mb-4">
                  You scored <span className="font-bold text-pink-600">{score}</span> out of <span className="font-bold">{questions.length}</span>
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  {getResultMessage()}
                </p>
                
                <div className="flex justify-center space-x-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-6 w-6 ${i < Math.ceil(score / questions.length * 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={resetQuiz}
                className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-pink-200/50 transition-all duration-300"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;