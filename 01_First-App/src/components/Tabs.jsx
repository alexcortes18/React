export default function Tabs({children, buttons, buttonsContainer = "menu"}) {
    const ButtonsContainer = buttonsContainer
    return (
    <>
        <ButtonsContainer>{buttons}</ButtonsContainer> {/* Or you can pass it as ButtonsContainer directly as the name of the prop.
        The only thing is that that dynamic tag/component HAS to start with capital letter for react to understand it as being dynamically passed. */}
        {children}
    </>
    );
}