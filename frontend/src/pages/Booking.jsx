import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Booking = () => {
  const testAmount = 100;
  const [extras, setExtras] = useState([]);
  const [error, setError] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const [totalAmount, settotalAmount] = useState(null);
  const [typeId,setTypeId] = useState(null);
  const [price,setPrice] = useState(null);

  

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
      const response = await axios.post(
        "http://localhost:5000/Reservation/addReservation",
        formData
      );
      setReservationId(response.data._id); 
      console.log("Reservation Added:", response.data);
      settotalAmount(response.data.totalAmount);
      console.log("Reservation Added:", totalAmount);
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
    setIsFormSubmitted(true);
  };
  

  const handlePayment = async () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount, // Remplacez par le montant à payer
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          
          try {
          
            const response = await fetch('http://localhost:5000/Reservation/handlePayment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                reservationId: reservationId, // Utilisez l'état reservationId ici
                paymentId: order.id, // l'ID du paiement PayPal
              }),
            });
        
            if (response.ok) {
              console.log('Paiement enregistré avec succès');
            } else {
              console.error('Échec de l\'enregistrement du paiement');
            }
          } catch (error) {
            console.error('Erreur lors de l\'appel à l\'API', error);
          }
        },
        
        onError: (err) => {
          console.error(err);
        },
      })
      .render('#paypal-button-container');
  };

  useEffect(() => {
    handlePayment(); // Appeler la fonction handlePayment dans le useEffect
  }, [reservationId]); // Ajoutez reservationId comme dépendance

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
        setPrice(response.data.price)
        // console.log(response.data._id)
        console.log("Price  de la chambre:", price); // Voici où vous consolerez l'_id
       
      } catch (error) {
        setError(error.message);
      }
    };
    console.log(typeId); // Ceci affichera la valeur mise à jour de typeId à chaque fois qu'elle change
    console.log(typeId);
    
// Ceci affichera la valeur mise à jour de typeId à chaque fois qu'elle change
    fetchTypeDetails();
  }, [typeId]);
  useEffect(() => {
    console.log("Prix de la chambre:", price); // Ceci consolera la nouvelle valeur de price chaque fois qu'elle change
  }, [price]);
    useEffect(() => {
      console.log("Reservation Added:", totalAmount);
      // Ceci consolera la nouvelle valeur de price chaque fois qu'elle change
  }, [totalAmount]);
  return (
    <div className="container-xxl bg-white p-0">
      {/* <!-- Page Header Start --> */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(/assets/img/carousel-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center pb-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Booking
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Pages</a>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Booking
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Room Booking
            </h6>
            <h1 className="mb-5">
              Book A{" "}
              <span className="text-primary text-uppercase">Luxury Room</span>
            </h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    alt="test"
                    data-wow-delay="0.1s"
                    src="/assets/img/about-1.jpg"
                    style={{ marginTop: "25%" }}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.3s"
                    alt="about"
                    src="/assets/img/about-2.jpg"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-50 wow zoomIn"
                    data-wow-delay="0.5s"
                    alt="about"
                    src="/assets/img/about-3.jpg"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.7s"
                    alt="about"
                    src="/assets/img/about-4.jpg"
                  />
                </div>
              </div>
            </div>
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
                      <div className="btn btn-primary">
                        total Amount: {testAmount}
                      </div>
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
      {/* <!-- Booking End --> */}

      {/* <!-- Newsletter Start --> */}
      <div
        className="container newsletter mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row justify-content-center">
          <div className="col-lg-10 border rounded p-1">
            <div className="border rounded text-center p-1">
              <div className="bg-white rounded text-center p-5">
                <h4 className="mb-4">
                  Subscribe Our{" "}
                  <span className="text-primary text-uppercase">
                    Newsletter
                  </span>
                </h4>
                <div
                  className="position-relative mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  <input
                    className="form-control w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    Book Now
                  </button>
               
              </div>
              </div>
              {
  isFormSubmitted && (
    <div 
      
        className="col-12 btn btn-secondary w-100 py-3"
        onClick={() => { handlePayment() }}
        id="paypal-button-container"
      
        >
      
    </div>
  )
}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Newsletter Start --> */}
    </div>

  )};
export default Booking;
