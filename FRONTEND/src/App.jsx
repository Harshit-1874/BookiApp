import React, { useState } from 'react';
import BookingTable from './components/bookingTable'
import BookingForm from './components/bookingForm';
import EditCabForm from './components/editcCabForm';


function App() {
  const [showBookings, setShowBookings] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [buttonText, setButtonText] = useState('Create New Booking');
  const [editcabs,setEditCabs] = useState(false);

  const toggleBookings = () => {
    setShowBookings(!showBookings);
  };

  const toggleEditForm = () =>{
    setEditCabs(!editcabs);
  }

  const toggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
    setButtonText(showBookingForm ? 'Create New Booking' : 'Close Form');
  };

  return (
    <div className="container-fluid p-0 bg-dark">
      <div class="px-4 pt-5 my-5 text-center">
        <h1 class="display-4 fw-bold text-white">The Booki App</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4 text-white">Welcome to The Booki App! Quickly book cabs and manage your reservations with ease and least travel time.</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3" onClick={toggleBookingForm}>
              {buttonText}
            </button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={toggleBookings}>
              {showBookings ? 'Hide Bookings' : 'Show Bookings'}
            </button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4 me-sm-3" onClick={toggleEditForm}>
              {editcabs ? "Close Edit form" : "Edit cabs"}
            </button>
          </div>
        </div>
      </div>
      {showBookingForm && <BookingForm />}
      {showBookings && <BookingTable />}
      {editcabs && <EditCabForm/>}
    </div>
  );
}

export default App;
