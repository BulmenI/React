import { useState, useEffect } from 'react';
import { useDebounce, useLocalStorage } from '../hooks/hooks';
import Input from '../Input';
import TodoCard from '../TodoCard';
import '../App.css';
import TaskChart from '../Graf';

function HomePage() {
  const [value, setValue] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todosGraph, setTodosGraph] = useLocalStorage('todosGraph', [
    { name: "Выполнено", value: 0 },
    { name: "Осталось", value: 0 }
  ]);

  const debounceValue = useDebounce(value, 1000);
  const debounceStartTime = useDebounce(startTime, 1000);
  const debounceEndTime = useDebounce(endTime, 1000);

  useEffect(() => {
    if (
      value.trim() !== '' &&
      startTime.trim() !== '' &&
      endTime.trim() !== '' &&
      debounceValue.trim() !== '' &&
      debounceStartTime.trim() !== '' &&
      debounceEndTime.trim() !== ''
    ) {
      const taskObject = {
        id: Date.now(),
        text: debounceValue,
        startTime: debounceStartTime,
        endTime: debounceEndTime,
        completed: false,
      };
      setTodos(prev => [...prev, taskObject]);
      setValue('');
      setStartTime('');
      setEndTime('');
    }
  }, [debounceValue, debounceStartTime, debounceEndTime]);

  const onDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const onComplete = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const completeTodos = todos.filter(todo => todo.completed).length;
    const uncompleteTodos = todos.length - completeTodos;
    setTodosGraph([
      { name: "Выполнено", value: completeTodos },
      { name: "Осталось", value: uncompleteTodos },
    ]);
  }, [todos]);

  return (
    <div className="app">
      <h1 className="app-title">Мои задачи</h1>
      <Input
        text={value}
        onChangeText={setValue}
        startTime={startTime}
        onChangeStart={setStartTime}
        endTime={endTime}
        onChangeEnd={setEndTime}
      />
      {todos.length > 0 ? (
        <div className="todo-list">
          {todos.map(toDo => (
            <TodoCard
              key={toDo.id}
              startTime={toDo.startTime}
              endTime={toDo.endTime}
              taskText={toDo.text}
              completed={toDo.completed}
              deleteTask={() => onDelete(toDo.id)}
              completeTask={() => onComplete(toDo.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state-icon">📝</span>
          <p>Нет задач. Начните вводить выше — они появятся автоматически.</p>
        </div>
      )}
      <div>
        <TaskChart data={todosGraph} />
      </div>
    </div>
  );
}

export default HomePage;