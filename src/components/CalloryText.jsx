function CalloryText({product, increaseValue, addToList, productCallory}){

    return (
        <div
        className="callory--text"
        >
            <h1>{product}</h1>
            <h2>Калории на 100 грамм: {productCallory}</h2>
            <button onClick={increaseValue}>Количество</button>
            <button onClick={addToList}>Добавить</button>

        </div>
    );
}

export default CalloryText;