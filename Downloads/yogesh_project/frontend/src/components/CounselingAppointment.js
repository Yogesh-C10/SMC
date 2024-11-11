import React, { useState } from 'react';

function CounselingAppointment() {
  const [appointmentDetails, setAppointmentDetails] = useState({ counselor: '', time: '' });

  const handleChange = (e) => {
    setAppointmentDetails({ ...appointmentDetails, [e.target.name]: e.target.value });
  };

  const bookAppointment = () => {
    // Implement booking logic
    alert(`Appointment booked with ${appointmentDetails.counselor} at ${appointmentDetails.time}`);
  };

  return (
    <div>
      <h2>Book Counseling Appointment</h2>
      <input type="text" name="counselor" placeholder="Counselor" onChange={handleChange} />
      <input type="text" name="time" placeholder="Time" onChange={handleChange} />
      <button onClick={bookAppointment}>Book Appointment</button>
    </div>
  );
}

export default CounselingAppointment;
