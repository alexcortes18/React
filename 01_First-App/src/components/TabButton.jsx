export default function TabButton({ children, onSelect, isSelected }) {
    // function handleClick(){
    //     console.log("Hello World");
    // }


    return ( // Children: This is a default prop that contains whichever content we have between the Component tags (text).
        // But could also be some complex JSX structure between the tags.
        <li>
        
            <button className={isSelected ? "active": ""} onClick={onSelect}>{children}</button>  {/* we must not pass the () to handleClick() (now being onSelect), because we 
            want to pass it as a Value, not excuted directly by us. Instead it is executed by React whenever someone
            clicks the button. 
            
            onClick as prop/attribute of button cannot be renamed (that is the name that must be used for the event, 
            but the incoming prop (onSelect in this case) can also be name onClick or whatever we want.*/}
        </li>
    );
    //Vanilla Javascript:
    // document.querySelector('button').addEventListener('click', () => {})
    // In React, we can avoid that vanilla behavior by adding "event handlers" as "props" to the html button tag.

}
