import quiz_logo from '../assets/quiz-logo.png'

export default function Header(){
    return <header>
        <img src={quiz_logo} alt="Quiz Logo"/>
        <h1>ReactQuiz</h1>
    </header>
}