import { useState, useEffect, useMemo } from 'react';

const StaffDirectory = ({ onImport }) => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch staff data');
        const data = await response.json();
        setStaff(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter logic
  const filteredStaff = useMemo(() => {
    return staff.filter(person => 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [staff, searchQuery]);

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentRecords = filteredStaff.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  if (loading) return <div className="text-center p-10 dark:text-white">Loading staff...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          className="w-full max-w-md px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentRecords.map(person => (
          <div 
            key={person.id} 
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border dark:border-gray-700 flex flex-col justify-between transition-colors"
          >
            <div>
              <h3 className="font-bold text-lg dark:text-white">{person.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{person.email}</p>
              <div className="mt-2 text-xs text-blue-500 font-mono">{person.company.name}</div>
            </div>

            {/* NEW BUTTON: Import to Dashboard */}
            <button 
              onClick={() => onImport(person.name)}
              className="mt-4 w-full py-2 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Add to Tasks +
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-8">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-30 dark:text-white transition-opacity"
        >
          Prev
        </button>
        <span className="flex items-center dark:text-white text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-30 dark:text-white transition-opacity"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StaffDirectory;