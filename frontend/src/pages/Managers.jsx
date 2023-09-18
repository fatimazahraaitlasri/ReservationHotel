import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const Managers = () => {
  const [managers, setManagers] = useState([]);
  useEffect(() => {
    fetchManagers();
  }, [managers]);

  const fetchManagers = async () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');

    await axios
      .get("http://localhost:5000/Admin/getAllManager")
      .then((response) => {
        setManagers(response.data);
        console.log(managers);
      });
  };

  const deleteManager = async (id) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');

    await axios
      .delete(`http://localhost:5000/admin/DeleteManager/${id}`)
      .then((response) => {
        console.log("I am here", response);
      });
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold mb-6">Managers List</h1>
        <Link
          to="/new-manager"
          className="bg-red-500 hover:bg-red-600 h-10 text-white font-bold py-2 px-4 rounded"
        >
          Add new products
        </Link>
      </div>
      <div className="h-full overflow-x-scroll xl:overflow-hidden">
        <table className="w-full">
          <thead class="justify-between">
            <tr class="bg-gray-50">
              <th class="px-16 py-2">
                <span class="text-gray-800 font-semibold">Name</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-800 font-semibold">Email</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-800 font-semibold">Phone</span>
              </th>
              <th class="px-16 py-2">
                <span class="text-gray-800 font-semibold">Setting</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            {managers.map((manager) => (
              <tr class="border-b dark:border-neutral-500">
                <td class="px-16 py-2 text-center">
                  <span class="font-semibold">{manager.matricule}</span>
                </td>
                <td class="px-16 py-2 text-center">
                  <span>{manager.password}</span>
                </td>
                <td class="px-16 py-2 text-center">
                  <span>{manager.quantity}</span>
                </td>
                <td class="px-16 py-2">
                  <span class="text-yellow-500 flex justify-center">
                    <Link to={`/edit-manager/${manager._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-700 mx-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fill-rule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => {
                        deleteManager(manager._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-red-700"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Managers;
