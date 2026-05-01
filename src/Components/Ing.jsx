import { useEffect } from "react";
import { useState } from "react";

const Ing = ({ toDisplay = "" }) => {
  const [display, changeDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      console.log("interval ran", i);
      changeDisplay('.'.repeat(i));
      i++;
      if (i > 4) {
        changeDisplay('');
        i = 0;
      }
    }, 200);
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {toDisplay}{display}
    </>
  )
}
export default Ing;