import { useCallback, useState } from "react"
import QUESTIONS from '../questions.js';
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImg from '../assets/quiz-complete.png'

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers(prevUserAnswers => {
            return [...prevUserAnswers, selectedAnswer];
        });

        // Change the state of the answer to correct/incorrect
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }
            //Display the correct/incorrect color for 2 seconds.
            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);
    // activeQuestionIndex needs to be included since if it changes, handleSelectAnswer needs to be re-created
    //setUserAnswers DOES NOT need to be included because React already provides us with the lastest and most stable version.

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
    // In useCallback, dependencies are not just props or state... —they are any value that could change across re-renders.

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
                <QuestionTimer
                    key={activeQuestionIndex} //When the key is re-created the component gets create a new component,
                    // since REACT ONLY RE-RENDERS the components that changes, even if the QUIZ component gets "re-created"
                    timeout={5000}
                    onTimeout={handleSkipAnswer}>
                    {/* When <QuestionTimer> gets re-executed a new handleSelectAnswer(null) gets created.
                     so we need useCallback to prevent the function to be re-created again. */}
                </QuestionTimer>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => {
                        const isSelected =  userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = '';

                        if (answerState === 'answered' & isSelected){
                            cssClass = 'selected';
                        }

                        if ((answerState === 'correct' || answerState=== 'wrong') & isSelected){
                            cssClass = answerState;
                        }

                        return (
                            <li key={answer} className="answer">
                                <button className={cssClass} onClick={() => handleSelectAnswer(answer)}>
                                    {answer}
                                </button>
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
        </div>
    )

}