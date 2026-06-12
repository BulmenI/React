function Form(){

    return (
        <>  
        <input 
        type="text"
        onChange={(e) => submit(e.target.value )}
        />
        </>
    );
}

export default Form;