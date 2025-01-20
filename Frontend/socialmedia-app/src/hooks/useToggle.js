import { useEffect, useState } from "react";

function useToggle(initialState = false) {

    const [state, setState] = useState(initialState);

    const toggle = () => setState(prev => !prev);

    useEffect(() => {
        if (state) {
            document.body.style.overflow = state ? 'hidden' : 'auto';
            return () => {
                document.body.style.overflow = 'auto';
            };
        }
    }, [state]);
    return [state, toggle];
}

export default useToggle;
