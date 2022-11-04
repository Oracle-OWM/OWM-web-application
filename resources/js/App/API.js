import axios from 'axios';

// const baseURL = 'http://fehu.cardi-hu.com/api/auth';
const baseURL = 'http://127.0.0.1:8000/api/auth';

export const API = axios.create({
  baseURL: `${baseURL}`,
  data: {
    // "api_password":"145",
  }
});

export const CategoryAPI = axios.create({
  baseURL: `${baseURL}/admin/category`,
  data: {
    // "api_password":"145",
  }
});

export const CarModelAPI = axios.create({
  baseURL: `${baseURL}/admin/car-model`,
  data: {
    // "api_password":"145",
  }
});


export const ProductAPI = axios.create({
  baseURL: `${baseURL}/admin/product`,
  data: {
    // "api_password":"145",
  }
});


export const ServiceProviderAPI = axios.create({
  baseURL: `${baseURL}/admin/service-provider`,
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
