import { useCallback, useState } from "react"
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevUserAnswers => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);
    //setUserAnswers DOES NOT need to be included because React already provides us with the lastest and most stable version.

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
    // In useCallback, dependencies are not just props or state... —they are any value that could change across re-renders.
    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers}></Summary>
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex} //When the key is re-created the component gets create a new component,
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}>
            </Question>
        </div>
    )

}