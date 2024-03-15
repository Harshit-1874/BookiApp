import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookingTable = () => {
    const [tableData, setTableData] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://booki-app-backend.vercel.app/getbookings');
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteEntry = async (date, email, startTime) => {
        const confirmation = window.confirm('Are you sure you want to delete this booking?');
        if (!confirmation) return;

        try {
            await axios.post('https://booki-app-backend.vercel.app/deleteEntry', { date, email, startTime });
            fetchData();
            toast.success("Entry Deleted Successfully")
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const handleSort = () => {
        const sortedData = [...tableData];
        sortedData.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return isSorted ? dateA - dateB : dateB - dateA;
        });
        setTableData(sortedData);
        setIsSorted(!isSorted);
    };

    return (
        <div className='container w-full'>
            <h1 className="text-center w-full">Current Bookings</h1>
            <div className="table-responsive w-full">
                <table className='table table-striped table-hover w-full'>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Email</th>
                            <th scope="col">Source</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Cab Name</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((booking) => (
                            booking.bookings.map((bookingDetail, index) => (
                                <tr key={`${booking._id}-${index}`}>
                                    <td>{booking.date}</td>
                                    <td>{bookingDetail.email}</td>
                                    <td>{bookingDetail.source}</td>
                                    <td>{bookingDetail.destination}</td>
                                    <td>{bookingDetail.startTime}</td>
                                    <td>{bookingDetail.endTime}</td>
                                    <td>{bookingDetail.cabName}</td>
                                    <td>{bookingDetail.cost}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDeleteEntry(booking.date, bookingDetail.email, bookingDetail.startTime)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-primary" onClick={handleSort}>SORT</button>
        </div>
    );
};

export default BookingTable;
