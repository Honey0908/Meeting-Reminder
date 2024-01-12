import axios from 'axios';
import { FormDetails } from '../components/MeetingForm';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL; 
console.log(API_BASE_URL);

export const createCall = async (meetingDetails: FormDetails) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/make-call`,
      data: { meetingDetails:meetingDetails.topic +"\n"+ meetingDetails.agenda ,to:`+91${meetingDetails.to}`},
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
