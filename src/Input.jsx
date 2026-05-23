function Input({
    value,
    onChange,
    countryName,
    countryDescription,
}){

    return(
        <>
        <input type="text"
         value={value}
         onChange={(event) => onChange(event.target.value)}
        />
        <h1>{countryName}</h1>
        <p>{countryDescription}</p>
        </>
    );
}


export default Input;