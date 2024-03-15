import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const EditCabForm = () => {
    const [cabs, setCabs] = useState({});
    const [selectedCab, setSelectedCab] = useState('');
    const [inputValue, setInputValue] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://booki-app-backend.vercel.app/ratelist');
            setCabs(response.data); // Assuming the array is stored in a property called 'cabs'
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmission = async() =>{
        try{
            if(selectedCab &&  inputValue){
                const res = await axios.post('https://booki-app-backend.vercel.app/editcab',{
                    cab: selectedCab,
                    rate: parseInt(inputValue)
                });
                toast.success("Updated Value");
                resetForm();
            }else{
                toast.error("Please select a Cab and enter a valid value.");
                resetForm();
            }
        }catch(e){
            console.log("something went wrong : "+e);
        }
    }

    const resetForm = () =>{
        setSelectedCab('');
        setInputValue(0);
    };


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSelectChange = (e) => {
        setSelectedCab(e.target.value);
    };

    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-2">
            <h2>Edit Cab</h2>
            <div className="form-group">
                <label htmlFor="cabDropdown">Select a cab:</label>
                <select id="cabDropdown" className="form-control" value={selectedCab} onChange={handleSelectChange}>
                    <option value="">Select a cab</option>
                    {Object.keys(cabs).map((cabKey) => (
                        <option key={cabKey} value={cabKey}>{cabKey}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="inputField">Edit cab details:</label>
                <input type="number" id="inputField" min="0" className="form-control" value={inputValue} onChange={handleInputChange} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmission}>Save Changes</button>
            <ToastContainer/>
        </div>
    );
};

export default EditCabForm;
