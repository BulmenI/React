import React from 'react';

function TodoCard({
  startTime,
  endTime,
  taskText,
  deleteTask,
  completeTask,
  completed,
}) {
  return (
    <article className={`todo-card ${completed ? 'todo-card--done' : ''}`}>
      <header className="todo-card-header">
        <span className="todo-time">{startTime}</span>
        <span className="todo-time-separator">—</span>
        <span className="todo-time">{endTime}</span>
      </header>
      <div>
        <p className="todo-text">{taskText}</p>
      </div>
      <button onClick={deleteTask} className="todo-delete-btn">
        Удалить
      </button>
      <button onClick={completeTask} className="todo-complete-btn">
        {completed ? '✅ Выполнено' : '☐ Отметить'}
      </button>
    </article>
  );
}

export default React.memo(TodoCard);