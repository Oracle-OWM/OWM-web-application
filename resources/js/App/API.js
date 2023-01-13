import axios from 'axios';

// const baseURL = 'http://192.168.1.7:8000/api/auth';
const baseURL = `http://${window.location.hostname}:8000/api/auth`;
export const WSbaseURL = `ws://${window.location.hostname}:6001/app/livepost_key?protocol=7&client=js&version=7.5.0&flash=false`;
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
