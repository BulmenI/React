function CalloryInput({ value, onChange }) {
  return (
    <input
      type="text"
      className="callory--input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Введите название"
    />
  );
}

export default CalloryInput;