import OwlCarousel from "react-owl-carousel";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import moment from 'moment';

const Home = () => {
  const [specificDate, setSpecificDate] = useState("");
  const [rooms, setRooms] = useState([]);
  const [typeRooms, setTypeRooms] = useState([]);
  const [roomType, setRoomType] = useState(null);

  const navigate = useNavigate();
  const handleChangeDate = (e) => {
    setSpecificDate(e.target.value);
  };
  const handleChangeType = (e) => {
    setRoomType(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/Reservation/getAvailableRooms",
        {
          specificDate,
          roomType,
        }
      );

      console.log(roomType);
      console.log(specificDate);

      setRooms(response.data);
    } catch (err) {
      console.log(err.message);
    }
    //  finally {
    //   setLoading(false);
    // }
  };

  const options = {
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    item: 2,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  };
  useEffect(() => {
    const AllTypeRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Type/getAllType"
        );
        setTypeRooms(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    AllTypeRooms();
  }, []);

  return (
    <>
      {/* <!-- Carousel Start --> */}
      <div className="container-fluid p-0 mb-5">
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="w-100"
                src="./assets/img/carousel-1.jpg"
                alt="test"
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: "700px" }}>
                  <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                    Luxury Living
                  </h6>
                  <h1 className="display-3 text-white mb-4 animated slideInDown">
                    Discover A Brand Luxurious Hotel
                  </h1>
                  <a
                    href=""
                    className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Our Rooms
                  </a>
                  <a
                    href="/login"
                    className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    login
                  </a>
                  <a
                    href=""
                    className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                  >
                    Book A Room
                  </a>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="w-100"
                src="./assets/img/carousel-2.jpg"
                alt="test"
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: "700px" }}>
                  <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                    Luxury Living
                  </h6>
                  <h1 className="display-3 text-white mb-4 animated slideInDown">
                    Discover A Brand Luxurious Hotel
                  </h1>
                  <a
                    href=""
                    className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                  >
                    Our Rooms
                  </a>
                  <a
                    href=""
                    className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                  >
                    Book A Room
                  </a>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* <!-- Carousel End --> */}

      {/* <!-- Booking Start --> */}
      <div
        className="container-fluid booking pb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="bg-white shadow" style={{ padding: "35px" }}>
            <div className="row g-2">
              <div className="col-md-10">
                <div className="row g-2">
                  <div className="col-md-3">
                    <div
                      className="date"
                      id="date1"
                      data-target-input="nearest"
                    >
                      <input
                        name="CheckIn"
                        type="date"
                        className="form-control datetimepicker-input"
                        placeholder="Check in"
                        // data-target="#date1"
                        // data-toggle="datetimepicker"
                        value={specificDate}
                        onChange={handleChangeDate}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div
                      className="date"
                      id="date2"
                      data-target-input="nearest"
                    >
                      <input
                        name="CheckOut"
                        type="text"
                        className="form-control datetimepicker-input"
                        placeholder="Check out"
                        data-target="#date2"
                        data-toggle="datetimepicker"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      name="adult"
                      onChange={handleChangeType}
                    >
                      {typeRooms.map((typeRoom, index) => (
                        <option key={index} value={typeRoom.typeName}>
                          {typeRoom.typeName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select" name="Child">
                      <option selected>Child</option>
                      <option value="1">Child 1</option>
                      <option value="2">Child 2</option>
                      <option value="3">Child 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary w-100"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /////////////////////////////////// */}
      <div
        className="col-lg-4 col-md-6 wow fadeInUp"
        data-wow-delay="0.1s"
      ></div>
      <div className="row row-cols-1 row-cols-md-3 g-16 p-5">
        {rooms.map((room) => (
          <div className="room-item shadow rounded overflow-hidden ">
            <div key={room._id} className="position-relative">
              <img
                className="img-fluid rounded wow zoomIn"
                data-wow-delay="0.1s"
                style={{
                  maxWidth: "1140px",
                  margin: "0 auto",
                }}
                src={`data:${room.testImage.contentType};base64,${Buffer.from(
                  room.testImage.data.data
                ).toString("base64")}`}
                alt={`Chambre ${room.num}`}
              />
              <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                $100/Night
              </small>
            </div>
            <div className="p-4 mt-2">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">Junior Suite</h5>
                <div className="ps-2">
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                  <small className="fa fa-star text-primary"></small>
                </div>
              </div>
              <div className="d-flex mb-3">
                <small className="border-end me-3 pe-3">
                  <i className="fa fa-bed text-primary me-2"></i>3 Bed
                </small>
                <small className="border-end me-3 pe-3">
                  <i className="fa fa-bath text-primary me-2"></i>2 Bath
                </small>
                <small>
                  <i className="fa fa-wifi text-primary me-2"></i>Wifi
                </small>
              </div>
              <p className="text-body mb-3">
                Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
                sed diam stet diam sed stet lorem.
              </p>
              <div className="d-flex justify-content-between">
                <a className="btn btn-sm btn-primary rounded py-2 px-4" href="">
                  View Detail
                </a>

                <Link
                  to={`/booking/${room._id}`}
                  className="btn btn-sm btn-dark rounded py-2 px-4"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* /////////////////////////////////// */}
      {/* :::::::::::::::::::::::::::::::::::::: */}
      {/* <div>
      <h1>Chambres disponibles</h1>
      <div>
        {rooms.map(room => (
          
          <div key={room._id}>
            <h1>:::::::::::</h1>
            <h2>{room.num}</h2>
            <p>Capacité : {room.capacity}</p>
            <img src={`data:${room.testImage.contentType};base64,${Buffer.from(room.testImage.data.data).toString('base64')}`} alt={`Chambre ${room.num}`} />
          </div>
        ))}
      </div>
    </div> */}
      {/* :::::::::::::::::::::::::::::::::::::::::::::: */}
      {/* <!-- Booking End --> */}

      {/* <!-- About Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h6 className="section-title text-start text-primary text-uppercase">
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to{" "}
                <span className="text-primary text-uppercase">HotelHaven</span>
              </h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <div className="row g-3 pb-4">
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        1234
                      </h2>
                      <p className="mb-0">Rooms</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.3s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-users-cog fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        1234
                      </h2>
                      <p className="mb-0">Staffs</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.5s">
                  <div className="border rounded p-1">
                    <div className="border rounded text-center p-4">
                      <i className="fa fa-users fa-2x text-primary mb-2"></i>
                      <h2 className="mb-1" data-toggle="counter-up">
                        1234
                      </h2>
                      <p className="mb-0">Clients</p>
                    </div>
                  </div>
                </div>
              </div>
              <a className="btn btn-primary py-3 px-5 mt-2" href="">
                Explore More
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    alt="test"
                    data-wow-delay="0.1s"
                    src="./assets/img/about-1.jpg"
                    style={{ marginTop: "25%" }}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    alt="test"
                    data-wow-delay="0.3s"
                    src="./assets/img/about-2.jpg"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-50 wow zoomIn"
                    alt="test"
                    data-wow-delay="0.5s"
                    src="./assets/img/about-3.jpg"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    alt="test"
                    data-wow-delay="0.7s"
                    src="./assets/img/about-4.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}

      {/* <!-- Room Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Rooms
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Rooms</span>
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="room-item shadow rounded overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src="./assets/img/room-1.jpg"
                    alt=""
                  />
                  <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                    $100/Night
                  </small>
                </div>
                <div className="p-4 mt-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Junior Suite</h5>
                    <div className="ps-2">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bed text-primary me-2"></i>3 Bed
                    </small>
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bath text-primary me-2"></i>2 Bath
                    </small>
                    <small>
                      <i className="fa fa-wifi text-primary me-2"></i>Wifi
                    </small>
                  </div>
                  <p className="text-body mb-3">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet lorem.
                  </p>
                  <div className="d-flex justify-content-between">
                    <a
                      className="btn btn-sm btn-primary rounded py-2 px-4"
                      href=""
                    >
                      View Detail
                    </a>
                    <a
                      className="btn btn-sm btn-dark rounded py-2 px-4"
                      href=""
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="room-item shadow rounded overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src="./assets/img/room-2.jpg"
                    alt=""
                  />
                  <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                    $100/Night
                  </small>
                </div>
                <div className="p-4 mt-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Executive Suite</h5>
                    <div className="ps-2">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bed text-primary me-2"></i>3 Bed
                    </small>
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bath text-primary me-2"></i>2 Bath
                    </small>
                    <small>
                      <i className="fa fa-wifi text-primary me-2"></i>Wifi
                    </small>
                  </div>
                  <p className="text-body mb-3">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet lorem.
                  </p>
                  <div className="d-flex justify-content-between">
                    <a
                      className="btn btn-sm btn-primary rounded py-2 px-4"
                      href=""
                    >
                      View Detail
                    </a>
                    <a
                      className="btn btn-sm btn-dark rounded py-2 px-4"
                      href=""
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="room-item shadow rounded overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src="./assets/img/room-3.jpg"
                    alt=""
                  />
                  <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                    $100/Night
                  </small>
                </div>
                <div className="p-4 mt-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Super Deluxe</h5>
                    <div className="ps-2">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bed text-primary me-2"></i>3 Bed
                    </small>
                    <small className="border-end me-3 pe-3">
                      <i className="fa fa-bath text-primary me-2"></i>2 Bath
                    </small>
                    <small>
                      <i className="fa fa-wifi text-primary me-2"></i>Wifi
                    </small>
                  </div>
                  <p className="text-body mb-3">
                    Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                    lorem sed diam stet diam sed stet lorem.
                  </p>
                  <div className="d-flex justify-content-between">
                    <a
                      className="btn btn-sm btn-primary rounded py-2 px-4"
                      href=""
                    >
                      View Detail
                    </a>
                    <a
                      className="btn btn-sm btn-dark rounded py-2 px-4"
                      href=""
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Room End --> */}

      {/* <!-- Video Start --> */}
      <div className="container-xxl py-5 px-0 wow zoomIn" data-wow-delay="0.1s">
        <div className="row g-0">
          <div className="col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5">
              <h6 className="section-title text-start text-white text-uppercase mb-3">
                Luxury Living
              </h6>
              <h1 className="text-white mb-4">
                Discover A Brand Luxurious Hotel
              </h1>
              <p className="text-white mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <a href="" className="btn btn-primary py-md-3 px-md-5 me-3">
                Our Rooms
              </a>
              <a href="" className="btn btn-light py-md-3 px-md-5">
                Book A Room
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="video">
              <button
                type="button"
                className="btn-play"
                data-bs-toggle="modal"
                data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                data-bs-target="#videoModal"
              >
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="videoModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Youtube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <!-- 16:9 aspect ratio --> */}
              <div className="ratio ratio-16x9">
                <iframe
                  title="video"
                  className="embed-responsive-item"
                  src=""
                  id="video"
                  allowfullscreen
                  allowscriptaccess="always"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Video Start --> */}

      {/* <!-- Service Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Services
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Services</span>
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-hotel fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Rooms & Appartment</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet lorem.
                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-utensils fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Food & Restaurant</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet lorem.
                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-spa fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Spa & Fitness</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet lorem.
                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-swimmer fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Sports & Gaming</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet lorem.
                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-glass-cheers fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">Event & Party</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet lorem.
                </p>
              </a>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-dumbbell fa-2x text-primary"></i>
                  </div>
                </div>
                <h5 className="mb-3">GYM & Yoga</h5>
                <p className="text-body mb-0">
                  Erat ipsum justo amet duo et elitr dolor, est duo duo eos
                  lorem sed diam stet diam sed stet lorem.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Service End --> */}

      {/* <!-- Testimonial Start --> */}
      <div
        className="container-xxl testimonial my-5 py-5 bg-dark wow zoomIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <OwlCarousel className="testimonial-carousel py-5" {...options}>
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                est kasd kasd et erat magna eos
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  alt="test"
                  src="./assets/img/testimonial-1.jpg"
                  style={{ width: "45px", height: "45px" }}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Client Name</h6>
                  <small>Profession</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-3"></i>
            </div>
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                est kasd kasd et erat magna eos
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  alt="test"
                  src="./assets/img/testimonial-2.jpg"
                  style={{ width: "45px", height: "45px" }}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Client Name</h6>
                  <small>Profession</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-3"></i>
            </div>
            <div className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <p>
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                est kasd kasd et erat magna eos
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  alt="test"
                  src="./assets/img/testimonial-3.jpg"
                  style={{ width: "45px", height: "45px" }}
                />
                <div className="ps-3">
                  <h6 className="fw-bold mb-1">Client Name</h6>
                  <small>Profession</small>
                </div>
              </div>
              <i className="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-3"></i>
            </div>
          </OwlCarousel>
        </div>
      </div>
      {/* <!-- Testimonial End --> */}

      {/* <!-- Team Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Team
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Staffs</span>
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="rounded shadow overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src="./assets/img/team-1.jpg"
                    alt=""
                  />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Full Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="rounded shadow overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src="./assets/img/team-2.jpg"
                    alt=""
                  />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Full Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="rounded shadow overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src="./assets/img/team-3.jpg"
                    alt=""
                  />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Full Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="rounded shadow overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src="./assets/img/team-4.jpg"
                    alt=""
                  />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Full Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Team End --> */}

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
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Newsletter Start --> */}
    </>
  );
};
export default Home;
