import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const NewManager = () => {
  const [password, setPassword] = useState("");
  const [quantity, setQuantity] = useState("");
  const [matricule, setMatricule] = useState("");
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const url = "http://localhost:5000/Admin/AddManager";

  const config = { headers: { "content-type": "application/json" } };

  const navigate = useNavigate();

  const getTypes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Type/getAllType`);
      setType(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append("password", password);
    formData.append("quantity", quantity);
    formData.append("matricule", matricule);
    formData.append("Type", selectedType);

    const response = axios
      .post(
        url,
        formData,
        config
      )
      .then((res) => {
        console.log("Check this", res);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });

    // const response = await fetch('http://localhost:5000/Admin/AddManager', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ password, quantity, matricule, Type: selectedType }),
    // })
    // .then((res)=>{
    //     console.log("Check this", res);
    // });
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Add New Manager</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Matricule
          </label>
          <input
            type="text"
            id="matricule"
            name="matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
            Type
          </label>
          <select
            className="border border-gray-400 p-2 rounded-lg w-full"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {type.map((typeItem, index) => (
              <option key={index} value={typeItem._id}>
                {typeItem.typeName}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <input className="border border-gray-400 p-2 rounded-lg w-full"
                        type="file"
                        name="image"
                        onChange={handleImage} />
                </div> */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Manager
        </button>
      </form>
    </div>
  );
};

export default NewManager;
