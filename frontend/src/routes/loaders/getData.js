import axios from 'axios';
const templateURL = process.env.REACT_APP_SITE_LINK;

export const getCurrentUser = () => {
  const userId = localStorage.getItem( 'userId' );
  return userId
  ? axios.get(`${templateURL}/api/v1/users/${ userId }`)
  : null;
}

export const getTasks = () => {
  return axios.get(`${templateURL}/api/v1/tasks/`);
}