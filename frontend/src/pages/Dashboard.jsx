import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManagerDashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');

      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/Reservation/getStatsForManager');
          setStats(response.data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

  return (
    <div className="container mx-auto p-4">
    {stats.map((managerStats, index) => (
      <div key={index} className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Manager ID: {managerStats.managerId}</h2>
        <h3 className="text-lg mb-4">Manager Type: {managerStats.managerType}</h3>
        {managerStats.stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="mb-2">
              <span className="font-semibold">Year:</span> {stat._id.year}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Month:</span> {stat._id.month}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Total Sales:</span> {stat.totalSales}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Total Reservations:</span> {stat.totalReservations}
            </p>
          </div>
        ))}
      </div>
    ))}
  </div>
);






}

export default ManagerDashboard;

















// import React from "react";

// const Dashboard = () => {
//     return (
//         <div className="flex-1 py-4 px-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <div className="bg-white p-4 rounded shadow">
//                     <h2 className="text-lg font-medium mb-2">Users</h2>
//                     <p className="text-gray-500 text-sm">Total number of registered users</p>
//                     <p className="text-2xl font-bold text-green-500">1,234</p>
//                 </div>
//                 <div className="bg-white p-4 rounded shadow">
//                     <h2 className="text-lg font-medium mb-2">Sales</h2>
//                     <p className="text-gray-500 text-sm">Total sales for the month</p>
//                     <p className="text-2xl font-bold text-blue-500">$12,345</p>
//                 </div>
//                 <div className="bg-white p-4 rounded shadow">
//                     <h2 className="text-lg font-medium mb-2">Orders</h2>
//                     <p className="text-gray-500 text-sm">Total number of orders for the month</p>
//                     <p className="text-2xl font-bold text-purple-500">567</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
