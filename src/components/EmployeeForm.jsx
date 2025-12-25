import { useState } from 'react';

const EmployeeForm = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto bg-blue-50 p-4 rounded-lg border border-blue-100">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Employee's Name"
        className="flex-1 px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;