import Analytics from './components/Analytics';
import EmployeeDirectory from './components/EmployeeDirectory';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ACME HR Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Salary management and organization insights</p>
        </div>

        <div className="space-y-6">
          <Analytics />
          <EmployeeDirectory />
        </div>

      </div>
    </div>
  );
}

export default App;