import { useState } from "react";

export function useInput(defaultValue, validationFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    // This state is to keep track for "blur" or losing focus, which means that the user interacted with a field first,
    // and then clicked somewhere outside.
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
    }
}