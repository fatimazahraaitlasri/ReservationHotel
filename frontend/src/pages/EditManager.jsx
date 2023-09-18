import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const EditManager = () => {
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");

  //   const [image, setImage] = useState('');

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getManager();
  }, []);

  const getManager = async () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');

    try {
      const response = await axios.get(
        `http://localhost:5000/Admin/getManagerByID/${id}`
      );
      setQuantity(response.data.quantity);
      setType(response.data.Type);
      setMatricule(response.data.matricule);
      setPassword(response.data.password); // Assurez-vous que 'password' est le bon nom de champ
    } catch (error) {
      console.error("Erreur lors de la récupération du manager", error);
    }
  };

  // const handleImage = (e) => {
  //     const file = e.target.files[0];
  //     setImage(file);
  // }


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("Type", type); // Corrigé ici
    formData.append("matricule", matricule);
    formData.append("password", password);
    // console.log(first)
    axios
      .put(`http://localhost:5000/Admin/updateManager/${id}`, formData, {
        headers: {
          "Content-Type": "application/json", // Corrigé ici
        },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Manager</h1> // Corrigé ici
      <form
        method="post"
          onSubmit={handleSubmit}
      >
        <div className="mb-4">
          {/* ... */}
          <input
            type="text"
            id="matricule"
            name="matricule"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)} // Ajouté ici
            required
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          {/* ... */}
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Ajouté ici
            required
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          {/* ... */}
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} // Ajouté ici
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-lg w-full"
          />
        </div>

        {/* <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Image</label>
                    <input className="border border-gray-400 p-2 rounded-lg w-full"
                        type="file"
                        name="image"
                        onChange={handleImage} />
                </div> */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Update Manager{" "}
          {/* Modifiez le texte du bouton pour refléter l'action correcte */}
        </button>
      </form>
    </div>
  );
};

export default EditManager;
