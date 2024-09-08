import reactImg from '../../assets/react-core-concepts.png';  // We include an image path like this because the build process might overlook it if with just write it down in the "src" attribute of the header. This way, it does not get overlooked.
import './Header.css';

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1)); // (random number 0 to 1)*(max+1) -> all of this to floor function.
}

export default function Header() {
    const description = reactDescriptions[genRandomInt(2)];
  
    return (
      <header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {description} React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
    );
  }