import { useState, useRef, useEffect } from "react";


function Button () {

    useEffect( () => {

        const fetchData =  async ()=> {
            try{
                const response = await fetch(" ");
            if(!response.ok) {

                throw new Error (error.text);
            }
                const data = await response.json();
            }
            catch (error) {

                setError(error);
            }
            
        }

    }, [])

    const [value, setValue] = useState(0);

    const summ = () => {
        if(value ===  0 ) setValue(0);
        setValue((prev) => prev + 1);
    }
    const min = () => {
        if(value ===  0 ) setValue(0);
        setValue((prev) => prev - 1);
    }
    return (
        <>
        <button onClick={summ}> +</button>
        <button onClick={min} 
        disabled={value === 10}
        style={{
            backgroundColor: value > 10 ? 'orange' : undefined,
            color: value > 10 ? 'white' : undefined,
  }}
        > - </button>
        </>
    )

}