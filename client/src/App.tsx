// src/App.tsx
import React, { useState } from 'react';
import MeetingForm, { FormDetails } from './components/MeetingForm';
import './app.css'
import { createCall } from './services/api';


const App: React.FC = () => {
  const [loading,setLoading]=useState(false)
  const handleFormSubmit = (formData: FormDetails) => {
    console.log('Form Data:', formData);
    setLoading(true);
    const response:Promise<string>=createCall(formData);
    console.log(response);
    setLoading(false);
    
  };

  return (
    <>
    <h1 className='title'>Send Meeting Reminder</h1>
      <MeetingForm onSubmit={handleFormSubmit} />
      {loading && <p>Loading...</p>}
    </>
  );
};

export default App;
