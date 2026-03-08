import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaRedo } from 'react-icons/fa';

const QuizView = ({ moduleData, moduleId, onCompleteQuiz }) => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // Load best score on mount
    useEffect(() => {
        const saved = localStorage.getItem(`${moduleId}_quiz_best`);
        if (saved) setBestScore(parseInt(saved, 10));
    }, []);

    const handleSelectOption = (questionId, option) => {
        if (showResults) return; // Prevent changing after submit
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleSubmit = () => {
        let correctCount = 0;
        moduleData.quiz.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const finalScore = Math.round((correctCount / moduleData.quiz.length) * 100);
        setScore(finalScore);
        setShowResults(true);

        if (finalScore > bestScore) {
            setBestScore(finalScore);
            localStorage.setItem(`${moduleId}_quiz_best`, finalScore.toString());
        }

        if (finalScore >= 80) {
            onCompleteQuiz(finalScore);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setShowResults(false);
        setScore(0);
        window.scrollTo(0, 0);
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Check</h1>
                <p className="text-gray-600">Test your understanding of {moduleData?.title || 'this module'}.</p>
                {bestScore > 0 && <p className="text-sm text-green-600 font-medium mt-2">Best Score: {bestScore}%</p>}
            </div>

            <div className="space-y-8">
                {moduleData.quiz.map((q, index) => {
                    const selected = answers[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                        <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex gap-3">
                                <span className="bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-full text-sm flex-shrink-0">
                                    {index + 1}
                                </span>
                                {q.question}
                            </h3>

                            <div className="space-y-3 pl-11">
                                {q.options.map(option => {
                                    let optionClass = "w-full text-left p-3 rounded-lg border-2 transition-all flex justify-between items-center ";

                                    if (showResults) {
                                        if (option === q.correctAnswer) {
                                            optionClass += "bg-green-50 border-green-500 text-green-700 font-medium";
                                        } else if (option === selected && !isCorrect) {
                                            optionClass += "bg-red-50 border-red-500 text-red-700";
                                        } else {
                                            optionClass += "border-gray-100 text-gray-400 opacity-60";
                                        }
                                    } else {
                                        if (option === selected) {
                                            optionClass += "border-blue-500 bg-blue-50 text-blue-700";
                                        } else {
                                            optionClass += "border-gray-100 hover:border-blue-200 hover:bg-gray-50 text-gray-700";
                                        }
                                    }

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleSelectOption(q.id, option)}
                                            disabled={showResults}
                                            className={optionClass}
                                        >
                                            {option}
                                            {showResults && option === q.correctAnswer && <FaCheck className="text-green-600" />}
                                            {showResults && option === selected && !isCorrect && <FaTimes className="text-red-500" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {showResults && (
                                <div className={`mt-4 ml-11 p-4 rounded-lg text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    <p className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                                    <p>{q.explanation}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 text-center">
                {!showResults ? (
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length < moduleData.quiz.length}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Answers
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="text-2xl font-bold mb-2">
                            Your Score: <span className={score >= 80 ? 'text-green-600' : 'text-orange-500'}>{score}%</span>
                        </div>
                        <button
                            onClick={handleRetry}
                            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center gap-2 mx-auto"
                        >
                            <FaRedo /> Retry Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizView;
