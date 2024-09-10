import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) { //When Quiz App is executed shuffledAnswers is undefined
        // This needs to come after if (quizIsComplete), to avoid QUESTIONS[activeQuestionIndex].answers being undefined (out of
        // bounds)
        shuffledAnswers.current = [...answers];
        // sort() -> Does not return a new array, but sorts the same array we work with.
        // Math.random() returns a value between 0 and 1, and we subtract 0.5 to have negative values about half of the time.
        // .sort((a,b)=> 1). When we return a positive number, the (a,b) will remain in the same place
        // When we return a negative number, they swap positions.
        // Since we are not using (a,b) directly inside the arrow function, we can choose to exclude it from the 
        // .sort(()=> some code) if we want.
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            {shuffledAnswers.current.map(answer => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if (answerState === 'answered' & isSelected) {
                    cssClass = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') & isSelected) {
                    cssClass = answerState;
                }
                return (
                    <li key={answer} className="answer">
                        <button
                            className={cssClass}
                            onClick={() => onSelect(answer)}
                            disabled={answerState !== ''}
                        >
                            {answer}
                        </button>
                    </li>
                )
            }
            )}
        </ul>
    )
}