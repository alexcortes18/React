export default function Section({ title, children, ...props }) { // ""...props" -> Rest operator to group ALL other ('leftover') props (elements, or objects) into a single object named props
    return (
        <section {...props}> {/* This is object destructing, or spread operator. We are spreading the props object into individual elements. */}
            <h2>{title}</h2>
            {children} 
        </section>
    );
}