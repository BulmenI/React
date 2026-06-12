function Input({ text, startTime, endTime, onChangeText, onChangeStart, onChangeEnd }) {
  return (
    <div className="input-form">
      <div className="input-group">
        <label htmlFor="taskText">Текст задачи</label>
        <input
          id="taskText"
          type="text"
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Введите текст задачи"
        />
      </div>
      <div className="input-group">
        <label htmlFor="startTime">Начальное время</label>
        <input
          id="startTime"
          type="text"
          value={startTime}
          onChange={(e) => onChangeStart(e.target.value)}
          placeholder="Введите начальное время"
        />
      </div>
      <div className="input-group">
        <label htmlFor="endTime">Конечное время</label>
        <input
          id="endTime"
          type="text"
          value={endTime}
          onChange={(e) => onChangeEnd(e.target.value)}
          placeholder="Введите конечное время"
        />
      </div>
    </div>
  );
}

export default Input;