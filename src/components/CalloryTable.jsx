function CalloryTable({ items, onDelete }) {
  if (!items || items.length === 0) {
    return <p className="callory--empty">Сохранённых продуктов пока нет</p>;
  }

  return (
    <div className="callory--table-wrapper">
      <table className="callory--table">
        <thead>
          <tr>
            <th>Продукт</th>
            <th>Ккал (100 г)</th>
            <th>Порции</th>
            <th>Всего ккал</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const caloriesPer100 = item.nutriments?.["energy-kcal_100g"] ?? 0;
            const totalCalories = caloriesPer100 * (item.multiplier || 1);
            return (
              <tr key={index}>
                <td>{item.product_name || "Без названия"}</td>
                <td>{caloriesPer100}</td>
                <td>{item.multiplier || 1}</td>
                <td>{totalCalories}</td>
                <td>
                  <button
                    className="callory--delete-btn"
                    onClick={() => onDelete(index)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default CalloryTable;