import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Booking = () => {
  const [extras, setExtras] = useState([]);
  const [error, setError] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const [totalAmount, settotalAmount] = useState(null);
  const [typeId, setTypeId] = useState(null);

  const { roomId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roomId: roomId,
    extras: [],
    totalAmount: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name);
    console.log(value);
  };

  const addReservation = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // console.log(first)

      const response = await axios.post(
        "http://localhost:5000/Reservation/addReservation",
        formData
      );
      setReservationId(response.data._id); // ajustez cette ligne selon la structure de votre réponse
      console.log("Reservation Added:", response.data);
      // Ici, stockez l'ID de la réservation pour l'utiliser dans le paiement
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
    setIsFormSubmitted(true);
  };

  // useEffect(() => {
  //   handlePayment(); // Appeler la fonction handlePayment dans le useEffect
  // }, [reservationId]); // Ajoutez reservationId comme dépendance

  const handleExtrasChangee = async (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      let extras = [...prevState.extras];
      if (checked) {
        extras.push(value);
      } else {
        extras = extras.filter((extra) => extra !== value);
      }
      return { ...prevState, extras };
    });
  };

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/extra/getAllExtras"
        );
        setExtras(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchExtras();
  }, []);

  useEffect(() => {
    if (roomId) {
      setFormData((prevState) => ({ ...prevState, roomId }));
    }
  }, [roomId]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Admin/getChambreById/${roomId}`
        );
        setTypeId(response.data.Type);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  useEffect(() => {
    const fetchTypeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Type/getTypeById/${typeId}`
        );
        setTypeId(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    console.log(typeId); // Ceci affichera la valeur mise à jour de typeId à chaque fois qu'elle change
    fetchTypeDetails();
  }, [typeId]);
  return (
    <div className="container-xxl bg-white p-0">
      {/* <!-- Page Header Start --> */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form onSubmit={addReservation}>
                  <div className="row g-3 ">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="roomId"
                          placeholder="Your Name"
                          name="roomId"
                          value={roomId}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="roomId">roomId</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date3"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control datetimepicker-input"
                          id="checkin"
                          placeholder="Check In"
                          data-target="#date3"
                          // data-toggle="datetimepicker"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="checkin">Check In</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date4"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control datetimepicker-input"
                          id="checkout"
                          placeholder="Check Out"
                          data-target="#date4"
                          // data-toggle="datetimepicker"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="checkout">Check Out</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select className="form-select" id="select1">
                          <option value="1">Adult 1</option>
                          <option value="2">Adult 2</option>
                          <option value="3">Adult 3</option>
                        </select>
                        <label htmlFor="select1">Select Adult</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select className="form-select" id="select2">
                          <option value="1">Child 1</option>
                          <option value="2">Child 2</option>
                          <option value="3">Child 3</option>
                        </select>
                        <label htmlFor="select2">Select Child</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          {extras.map((extra, index) => (
                            <div
                              className="form-check form-check-inline"
                              key={index}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`inlineCheckbox${index}`}
                                value={extra._id}
                                onChange={handleExtrasChangee}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`inlineCheckbox${index}`}
                              >
                                {extra.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleInputChange}
                        >
                          <option value>Payment Method</option>
                          <option value="stripe">Stripe</option>
                          <option value="paypal">Paypal</option>
                          <option value="sur place">sur place</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="btn btn-primary"></div>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                        // onClick={ addReservation}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Booking;
