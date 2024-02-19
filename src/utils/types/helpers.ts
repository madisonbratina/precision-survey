import axios from 'axios';
import { toast } from 'react-toastify';

export const copyToClipboard = async (text: string) => {
  if (!text) {
    return false;
  }
  try {
    await window.navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
};

export const truncateString = (sentence: string, length: number = 3) => {
  if (!sentence) {
    return '';
  }
  const words = sentence.split(' ');
  return words.slice(0, length).join(' ');
};

export const gogleLoginSuccess = async (data: any) => {
  const { access_token } = data;

  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    return response.data.email;
  } catch (error) {
    gogleLoginFail();
    return null;
  }
};

export const gogleLoginFail = async () => {
  toast.error('Google login failed!');
};
