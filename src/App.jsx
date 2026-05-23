import Input from "./Input";
import { useState, useEffect } from "react";

function App(){
const [error,setError] = useState(null);
const [loading, setLoading] = useState(false);
const [value,setValue] = useState("");
const [debounceValue, setDebounceValue] = useState("");
const [data, setData] = useState(null);

  useEffect(()=> {
      const timer = setTimeout(() => {
        setDebounceValue(value);
      }, 1000);
      return () => clearTimeout(timer);
  },[value])



  
  useEffect(() => {
      setData(null)
      setLoading(true)
      setError(null)

       const fetchCountry = async () => {
        try{
            const response = await fetch(`https://restcountries.com/v3.1/translation/${encodeURIComponent(debounceValue)}`);
            if(!response.ok) {
              throw new Error(`HTTP error - ${response.status}`);
            }
            const data = await response.json();
            setData(data[0]);
        } catch(error){

          setError(error.message)

        }finally{

          setLoading(false);
        }
       }
       fetchCountry();
  },[debounceValue])

   const countryName = value
    ? country.translations?.rus?.common || country.name?.common
    : "";

  const countryDescription = value
    ? `Столица: ${country.capital?.[0] || "нет данных"}`
    : "";

  return (
    <>
    <Input
      value={value}
      onChange={setValue}
      countryName={countryName}
      countryDescription={countryDescription}
    />
    </>
    
  );

}


export default App;