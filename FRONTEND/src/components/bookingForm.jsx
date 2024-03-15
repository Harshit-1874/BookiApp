import React, { useState } from 'react';
import axios from 'axios';
import calEndTime from "../assets/functionForConversion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookingForm() {
  const [formData, setFormData] = useState({
    date: '',
    email: '',
    source: 'A',
    destination: 'B',
    time: '',
    cab: ''
  });

  const [availableCabs, setAvailableCabs] = useState([]);
  const [showAvailableCabs, setShowAvailableCabs] = useState(false);
  const [price, setPrice] = useState('');
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [rateList, setRateList] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetFormFields = () => {
    setFormData({
      name: "",
      email: "",
      source: "A",
      destination: "B",
      time: "",
      cab: ""
    });
  };

  const handleGetPricing = async () => {
    try {
      const response = await axios.post('http://localhost:8000/getshortestdistance', {
        source: formData.source,
        destination: formData.destination,
        time: formData.time // Assuming the available cabs are sent to the pricing API
      });
      setEndTime(calEndTime(formData.time, response.data.distance));
      const response2 = await axios.post('http://localhost:8000/getrates', {
        availableCabs: availableCabs,
        distance: response.data.distance
      });
      const cabPrice = response2.data[formData.cab];
      setPrice(String(cabPrice));
      setConfirmBooking(true);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/getAvailableCabs', {
        date: formData.date,
        time: formData.time
      });
      if (formData.source === formData.destination) {
        toast.error("Source and destination cannot be same");
        return;
      }
      const response2 = await axios.get('http://localhost:8000/rateList');
      setAvailableCabs(response.data.availableCabs);
      setRateList(response2.data);
      setShowAvailableCabs(true);
    } catch (error) {
      console.error('Error fetching available cabs:', error);
    }
  };


  const doBooking = async () => {
    try {
      const response = await axios.post("http://localhost:8000/addbooking", {
        date: formData.date,
        email: formData.email,
        source: formData.source,
        destination: formData.destination,
        startTime: formData.time,
        endTime: endTime,
        cabName: formData.cab,
        cost: price
      });
      toast.success("Booking successful");
      setShowAvailableCabs(false);
      setConfirmBooking(false);
      resetFormFields();
    } catch (err) {
      toast.error("Failed to book the cab");
    }
  }

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-2">
      <div className="row align-items-center g-lg-5">
        <div className="col-md-10 mx-auto col-lg-5">
          <h1 className='text-center fw-bold'>Booking Form</h1>
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" required />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" name="source" value={formData.source} onChange={handleChange} required>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
              <label htmlFor="source">Source</label>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select" name="destination" value={formData.destination} onChange={handleChange} required>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </select>
              <label htmlFor="destination">Destination</label>
            </div>
            <div className="form-floating mb-3">
              <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input type="time" className="form-control" id="time" name="time" value={formData.time} onChange={handleChange} required />
              <label htmlFor="time">Time</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Get Available Cabs</button>
          </form>
          {showAvailableCabs && (
            <div className="mt-4">
              <h3>Available Cabs:</h3>
              <select className="form-select mb-3" value={formData.cab} name='cab' onChange={handleChange}>
                <option disabled selected value="">Select a Cab Type...</option>
                {availableCabs.map((cab, index) => (
                  <option key={index} value={cab}>
                    {`${cab} - ${rateList[cab]} per minute`}
                  </option>
                ))}
              </select>
              <button onClick={handleGetPricing} className="w-100 btn btn-lg btn-primary mb-3">Get Pricing</button>
            </div>
          )}
          {confirmBooking && (
            <div className="mt-4">
              <h3>Reach Destination at:</h3>
              <input type="text" value={endTime} className='form-control mb-3' readOnly />
              <h3>Price:</h3>
              <input type="text" value={price} className="form-control mb-3" readOnly />
              <button className="w-100 btn btn-lg btn-success" onClick={doBooking}>Confirm Booking</button>
            </div>
          )}
       </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BookingForm;