import { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import TaskManager from './taskManager';
import StaffDirectory from './Directory';

const EmployeeManager = () => {
  //  THE "MEMORY" (State Initialization) ---
  const [employees, setEmployees] = useState(() => {
    const savedData = localStorage.getItem('dashboard_employees');
    return savedData ? JSON.parse(savedData) : [];
  });

  // (Automatic Saving) ---
  useEffect(() => {
    localStorage.setItem('dashboard_employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (name) => {
    // We keep this logic to prevent adding the same person twice
    if (employees.find(emp => emp.name === name)) {
        alert("Employee already added!");
        return;
    }

    const newEmployee = {
      id: crypto.randomUUID(),
      name: name,
      tasks: []
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateTasks = (employeeId, newTasks) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, tasks: newTasks } : emp
    ));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* SECTION 1: API Directory */}
      <section>
        <h2 className="text-2xl font-bold dark:text-black mb-4">Available Staff (API)</h2>
        <StaffDirectory onImport={addEmployee} />
      </section>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* SECTION 2: Manual Entry */}
      <section>
        <h2 className="text-2xl font-bold dark:text-black mb-4 text-center">Custom Employee Entry</h2>
        <EmployeeForm onAdd={addEmployee} />
      </section>

      {/* SECTION 3: Task Management Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div key={emp.id} className="border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-sm">
             <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">{emp.name}</h2>
             <TaskManager 
                tasks={emp.tasks} 
                setTasks={(newTasks) => updateTasks(emp.id, newTasks)} 
             />
          </div>
        ))}
      </section>
    </div>
  );
};

export default EmployeeManager;