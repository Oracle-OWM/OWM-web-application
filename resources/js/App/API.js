import axios from 'axios';

// const baseURL = 'http://fehu.cardi-hu.com/api/auth';
// const baseURL = 'http://172.20.10.10:8000/api/auth';
// const baseURL = 'http://192.168.1.7:8000/api/auth';
const baseURL = `http://${window.location.hostname}:8000/api/auth`;
// const baseURL = 'http://127.0.0.1:8000/api/auth';
//
export const API = axios.create({
  baseURL: `${baseURL}`,
  data: {
    // "api_password":"145",
  }
});

export const IoTDeviceAPI = axios.create({
  baseURL: `${baseURL}/admin/IoT-devices`,
  data: {
    // "api_password":"145",
  }
});


export const ObserverAPI = axios.create({
  baseURL: `${baseURL}/admin/observers`,
  data: {
    // "api_password":"145",
  }
});


export const UserAPI = axios.create({
  baseURL: `${baseURL}/admin/user`,
  data: {
    // "api_password":"145",
  }
});

export const AccountsAPI = axios.create({
  baseURL: `${baseURL}/admin`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
});


export const SettingsAPI = axios.create({
  baseURL: `${baseURL}/admin/settings`,
  headers : {
    // Authorization: `Bearer ${Cookies.get('admin') ? JSON.parse(Cookies.get('admin')).api_token.access_token : ""}`,
  },
  data:{
    // "api_password":"145",
  }
});
