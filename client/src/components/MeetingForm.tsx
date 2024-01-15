// src/components/MeetingForm.tsx
import React, { useState } from 'react';

interface MeetingFormProps {
  onSubmit: (formData: FormDetails) => void;
  callInitiated:boolean;
}

export interface FormDetails {
  topic: string;
  agenda: string;
  to: string;
  host_phoneNo:string;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ onSubmit,callInitiated }) => {
  const [formData, setFormData] = useState<FormDetails>({
    topic: '',
    agenda: '',
    to: '',
    host_phoneNo:''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="meeting-form">
      <label htmlFor='topic' className="form-label">Meeting Topic:</label>
        <input disabled={callInitiated} type="text" name="topic" value={formData.topic} onChange={handleChange} required />

      <label className="form-label" htmlFor='agenda'> Agenda:</label>
        <textarea disabled={callInitiated} name="agenda" value={formData.agenda} onChange={handleChange} required rows={10} cols={70}/>

      <label className="form-label" htmlFor='to'> Phone Number: </label>
        <input disabled={callInitiated} type="tel" name="to" pattern="[0-9]{10}" value={formData.to} onChange={handleChange} required/>
        
      <label className="form-label" htmlFor='host_phoneNo'> Host Phone Number: </label>
        <input disabled={callInitiated} type="tel" name="host_phoneNo" pattern="[0-9]{10}" value={formData.host_phoneNo} onChange={handleChange} required/>
        <small className="form-hint">Enter a 10-digit phone number without spaces or dashes.</small>

      <button disabled={callInitiated} type="submit" className="submit-button">
        Call
      </button>
    </form>
  );
};

export default MeetingForm;
