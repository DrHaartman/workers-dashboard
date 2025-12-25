import { useState, useMemo } from 'react';

// Destructure tasks and setTasks from props
const TaskManager = ({ tasks, setTasks }) => {
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask = { id: crypto.randomUUID(), text: inputValue, completed: false };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filter === 'completed') return t.completed;
      if (filter === 'uncompleted') return !t.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Assign task..."
          className="flex-1 text-sm px-3 py-1 border rounded"
        />
        <button className="text-xs bg-gray-800 text-white px-3 py-1 rounded">Add</button>
      </form>

      <div className="flex gap-2 mb-3">
        {['all', 'uncompleted', 'completed'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded ${filter === f ? 'bg-blue-100 text-blue-700' : 'text-gray-400'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.text}</span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;