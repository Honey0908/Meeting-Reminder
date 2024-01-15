// src/App.tsx
import React, { useEffect, useState } from 'react';
import MeetingForm, { FormDetails } from './components/MeetingForm';
import './app.css'
import { createCall } from './services/api';
import { io } from 'socket.io-client';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [callInitiated, setCallInitiated] = useState(false);
  const [attendance, setAttendance] = useState<boolean | undefined>(undefined);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [callStatus, setCallStatus] = useState("");

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);

    socket.on('connect', () => {
      console.log("connected");
    });

    socket.on('recordingUrl', (recordingUrl) => {
      setRecordingUrl(recordingUrl);
    });

    socket.on('attendance', (attendance) => {
      setAttendance(attendance);
    });

    socket.on('callStatus', (callStatus) => {
      console.log("callStatus");
      setCallStatus(callStatus);
    });

    return () => {
      socket?.disconnect();
    };
  }, []); 

  const handleFormSubmit = async (formData: FormDetails) => {
    setLoading(true);
    const response = await createCall(formData);
    if (response?.sid) {
      setCallInitiated(true);
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    setCallInitiated(false);
    setAttendance(undefined);
    setRecordingUrl("");
    setCallStatus("");
  };

  return (
    <>
      <h1 className='title'>Send Meeting Reminder</h1>
      <MeetingForm callInitiated={callInitiated} onRefresh={handleRefresh} onSubmit={handleFormSubmit} />
      {loading ? (
        <p>Loading...</p>
      ) : callInitiated ? (
        <>
          {!callStatus && <p>Call ongoing...</p>}
          {attendance === undefined ? (
            <p>Attendance: Unset</p>
          ) : attendance ? (
            <p>User has Confirmed</p>
          ) : (
            <p>User has declined</p>
          )}
          {recordingUrl && <a href={recordingUrl}>Voice Mail</a>}
          {callStatus && <p>Call Status: {callStatus}</p>}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
