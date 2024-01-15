// src/components/MeetingForm.tsx
import React, { useState } from 'react';

interface MeetingFormProps {
  onSubmit: (formData: FormDetails) => void;
  callInitiated: boolean;
  onRefresh: () => void;
}

export interface FormDetails {
  topic: string;
  agenda: string;
  to: string;
  host_phoneNo: string;
}

const MeetingForm: React.FC<MeetingFormProps> = ({ onSubmit, callInitiated, onRefresh }) => {
  const [formData, setFormData] = useState<FormDetails>({
    topic: '',
    agenda: '',
    to: '',
    host_phoneNo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleRefresh = () => {
    setFormData({ topic: '', agenda: '', to: '', host_phoneNo: '' });
    onRefresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="meeting-form">
        <label htmlFor='topic' className="form-label">Meeting Topic:</label>
        <input disabled={callInitiated} type="text" name="topic" value={formData.topic} onChange={handleChange} required />

        <label className="form-label" htmlFor='agenda'> Agenda:</label>
        <textarea disabled={callInitiated} name="agenda" value={formData.agenda} onChange={handleChange} required rows={10} cols={70} />

        <label className="form-label" htmlFor='to'> Phone Number: </label>
        <input disabled={callInitiated} type="tel" name="to" pattern="[0-9]{10}" value={formData.to} onChange={handleChange} required />

        <label className="form-label" htmlFor='host_phoneNo'> Host Phone Number: </label>
        <input disabled={callInitiated} type="tel" name="host_phoneNo" pattern="[0-9]{10}" value={formData.host_phoneNo} onChange={handleChange} required />
        <small className="form-hint">Enter a 10-digit phone number without spaces or dashes.</small>

        <button disabled={callInitiated} type="submit" className="submit-button">
          Call
        </button>
      </form>
      <div className='refresh-button-div'>
        <button title='refresh' className='refresh-button' onClick={handleRefresh}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" height={25} width={25}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MeetingForm;
