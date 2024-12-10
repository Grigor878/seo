import { useEffect } from "react";

const useOutsideClick = (ref, state, setState) => {
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (state && ref.current && !ref.current.contains(e.target)) {
        setState(!state);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ref, state, setState]);
};

export default useOutsideClick;