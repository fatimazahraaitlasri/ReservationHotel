import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import {
  About,
  Booking,
  Contact,
  Home,
  Rooms,
  Services,
  SharedLayout,
  Team,
  Testimonial,
  Managers,
  NewManager,
  EditManager,
  Dashboard,
  Login,
} from './pages';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>

          <Route path="/" element={<Layout />}> 
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path='managers' element={<Managers />} />
            <Route path='new-manager' element={<NewManager />} />
            <Route path='edit-manager/:id' element={<EditManager />} />
          </Route>

        <Route element={<SharedLayout />}> 
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="booking/:roomId" element={<Booking />} />
          <Route path="contact" element={<Contact />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="services" element={<Services />} />
          <Route path="team" element={<Team />} />
          <Route path="login" element={<Login />} />
          <Route path="testimonial" element={<Testimonial />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
