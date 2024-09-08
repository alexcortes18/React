import { useState } from 'react'; // This useState is a React Hook, to change states of components.
import { EXAMPLES } from "../data";
import TabButton from './TabButton';
import Section from './Section';
import Tabs from './Tabs';

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState();
    // this Hook function (useState) must be called inside a ReactComponent and in its top level (not inside another function, like inside handleSelect).
    // useState() can have an initial value ('Please click a button'), or also a wide variety of values: integers, booleans, objects, even functions (arrow functions).
    // useState() always returns 2 things:
    // counter (selectedTopic in this case) : current state value; in other words: state snapshot.
    // setCounter (setSelectedTopic) : state updating function. When this function is called it does 2 important things:
    // updates selectedTopic
    // tells React to re-render the component in which the useState is in (App() in this case)

    function handleSelect(selectedButton) {
        // selectedButton => 'components', 'jsx', 'props', 'state'
        setSelectedTopic(selectedButton);
    }

    let tabcontent = ""
    // {/* {!selectedTopic && <p>Please select a topic.</p>}   */ }
    if (!selectedTopic) {
        tabcontent = <p>Please select a topic.</p>
    }
    else {
        tabcontent =
            <div id="tab-content">
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                    <code>{EXAMPLES[selectedTopic].code}</code>
                </pre>
            </div>
    }
    return (
        <Section title="Examples" id="examples">
            <Tabs 
            // buttonsContainer = "menu" // To set the wrapper or container dynamically. If i wanted to set it to a custom component then: {Section} for example, no "" needed.
            // Built in components -> "" ; custom components -> {ComponentName}, do not use <> or ()
            buttons={ //We can also pass JSX code as a prop!
                <>
                    {/* the arrow function ()=> ; helps us define an anonymous function to pass without executing it
            until it is executed by React when the onClick of the button happens. */}
                    <TabButton
                        isSelected={selectedTopic === "components" ? true : false}
                        onSelect={() => handleSelect('components')}
                    >
                        Components
                    </TabButton>
                    <TabButton
                        isSelected={selectedTopic === "jsx" ? true : false}
                        onSelect={() => handleSelect('jsx')}
                    >
                        JSX
                    </TabButton>
                    <TabButton
                        isSelected={selectedTopic === "props" ? true : false}
                        onSelect={() => handleSelect('props')}
                    >
                        Props
                    </TabButton>
                    <TabButton
                        isSelected={selectedTopic === "state" ? true : false}
                        onSelect={() => handleSelect('state')}
                    >
                        State
                    </TabButton>
                </>
            }>
                {tabcontent}</Tabs>
        </Section>
    );
}