import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Цвета для секторов
const COLORS = ['#4caf50', '#e0e0e0']; // зелёный для выполненных, серый для оставшихся

/**
 * Компонент круговой диаграммы для отображения прогресса задач.
 * @param {object} props
 * @param {Array<{ name: string, value: number }>} props.data - Массив объектов для диаграммы
 */
function TaskChart({ data }) {
  // Защита от пустых данных (когда нет задач)
  if (!data || data.length === 0) {
    return <p className="empty-chart">Нет данных для отображения</p>;
  }

  return (
    <div className="chart-container">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"          // центр по горизонтали
          cy="50%"          // центр по вертикали
          innerRadius={60}  // внутренний радиус (делает кольцо)
          outerRadius={90}  // внешний радиус
          dataKey="value"   // какое поле использовать для размера сектора
          label={({ name, value }) => `${name}: ${value}`} // подписи на секторах
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />   {/* всплывающая подсказка при наведении */}
        <Legend />    {/* легенда */}
      </PieChart>
    </div>
  );
}

export default TaskChart;