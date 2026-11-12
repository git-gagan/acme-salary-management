import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 15;

  useEffect(() => {
    setLoading(true);
    const offset = page * limit;
    // We will build this backend endpoint next
    // axios.get(`http://localhost:8000/employees?limit=${limit}&offset=${offset}`)
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    axios.get(`${API_BASE_URL}/employees...`)
      .then(response => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Employee Directory</h2>
      
      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading records...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Department</th>
                <th className="px-4 py-3 font-medium text-gray-600">Country</th>
                <th className="px-4 py-3 font-medium text-gray-600">Salary (USD)</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{emp.name}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.department}</td>
                  <td className="px-4 py-3 text-gray-600">{emp.country}</td>
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    ${emp.salary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 border-t pt-4">
        <span className="text-sm text-gray-600">
          Showing {page * limit + 1} to {(page + 1) * limit}
        </span>
        <div className="space-x-2">
          <button 
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 border rounded text-sm disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          <button 
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 border rounded text-sm hover:bg-gray-50 bg-blue-50 text-blue-700 border-blue-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}