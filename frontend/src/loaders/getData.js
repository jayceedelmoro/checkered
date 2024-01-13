import axios from 'axios';
const templateURL = process.env.REACT_APP_SITE_LINK;

export const getCurrentUser = () => {
  return axios.get(`${templateURL}/api/v1/users/${ localStorage.getItem( 'userId' )}`);
}

export const getTasks = () => {
  return axios.get(`${templateURL}/api/v1/tasks/`);
}