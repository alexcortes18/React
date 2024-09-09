import { useState } from "react"
import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevUserAnswers => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    // This needs to come after if (quizIsComplete), to avoid QUESTIONS[activeQuestionIndex].answers being undefined (out of
    // bounds)

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    // sort() -> Does not return a new array, but sorts the same array we work with.
    // Math.random() returns a value between 0 and 1, and we subtract 0.5 to have negative values about half of the time.
    // .sort((a,b)=> 1). When we return a positive number, the (a,b) will remain in the same place
    // When we return a negative number, they swap positions.
    // Since we are not using (a,b) directly inside the arrow function, we can choose to exclude it from the 
    // .sort(()=> some code) if we want.
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(
                        answer => (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)}>
                                    {answer}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    )

}