import axios from 'axios';
import { FormDetails } from '../components/MeetingForm';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL; 
interface ApiResponse{
  "sid":string;
  [key: string]: any;
}

export const createCall = async (meetingDetails: FormDetails):Promise<ApiResponse> => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/make-call`,
      data: { meetingDetails:meetingDetails.topic +"\n"+ meetingDetails.agenda ,to:`+91${meetingDetails.to}`,host_phoneNo:`+91${meetingDetails.host_phoneNo}`},
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
