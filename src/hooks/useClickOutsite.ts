import React, {useEffect, useRef} from "react"


 /* 
    This function works similar to onBlur handler,
    Takes a callback and executes it when user clicks outside the element
    It returns a ref, the ref should be attached to the target element.
 */

export const useClickOutsite = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return [ref] as const ;

}