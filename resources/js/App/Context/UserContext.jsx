import React, { useReducer, useContext } from "react";
import * as TYPES from "./types";
import swal from 'sweetalert';
import {UserAPI, API } from '../API';
import { useHistory } from "react-router";
import Cookies from 'js-cookie';
import { AlertContext } from "./AlertContext";
import { AdminContext } from "./AdminContext";


const UserContext = React.createContext();

const UserState = (props) => {
  const initialState = {
    loading: false,
    loading2: false,
    users: [],
    user: {},
    message: '',
    errors: {},
    status: 0,
    IoTDeviceDetails: {},
    inputsState: {},
    inputsState2: {},
  };
  const { logout } = useContext(AdminContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const [state, dispatch] = useReducer(userReducer, initialState);

  function setInput(e) {
    let inputsState = { ...state.inputsState };
    
    switch (e.target.name) {
      default:
        console.log('normal');
        dispatch({
          type: TYPES.SET_INPUT_VALUE, payload: {
            inputsState: { ...inputsState, [e.target.name]: e.target.value },
          }
        });
    }      

    console.log(state.inputsState);
  }

  function setInput2(e) {
    let inputsState2 = { ...state.inputsState2 };
    
    switch (e.target.name) {
      default:
        console.log('inputsState2');
        dispatch({
          type: TYPES.SET_INPUT_VALUE2, payload: {
            inputsState2: { ...inputsState2, [e.target.name]: e.target.value },
          }
        });
    }      

    console.log(state.inputsState);
  }

  function resetAllInputs() {
    dispatch({type:TYPES.RESET_ALL_INPUTS, payload: {
      inputsState: {
        // associated_geofences: [],
      },
      inputsState2: {
        // associated_geofences: [],
      },
    }});
    console.log(state.inputsState);
  }

  function resetAllInputs() {
    dispatch({type:TYPES.RESET_ALL_INPUTS, payload: {
      inputsState: {
        // associated_geofences: [],
      },
      inputsState2: {
        // associated_geofences: [],
      },
    }});
    console.log(state.inputsState);
  }
  
  function resetAllErrors() {
    dispatch({type:TYPES.RESET_ALL_ERRORS, payload: {
      errors: {},
    }});
    console.log(state.inputsState);
  }

  const getAllUsers = async () => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await UserAPI.get(`/`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
    }).then(async(response)=> {
      console.log("all users");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_ALL_OBJECTS, payload: { 
          users: response.data.users, 
          message: response.data.message,
          errorNum: response.data.errorNum,
          status: response.data.status, 
        }});
      } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
        await logout();
        history.replace(`/admin/login`);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      } else {
        dispatch({ 
          type: TYPES.GENERAL_ERRORS, payload: { 
          message: response.data.message,
          errorNum: response.data.errorNum,
          status: response.data.status, 
          }
        });
      }
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error.response.data.message,
          errors: error.response.data.errors,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  const addUser = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This User will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        console.log(inputsState);
        dispatch({ type: TYPES.SET_LOADING });
        const resp = await UserAPI.post(`/`, inputsState, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Add user");
            dispatch({ 
              type: TYPES.ADD_OBJECT, payload: { 
              message: response.data.message,
              errorNum: response.data.errorNum,
              status: response.data.status, 
              errors: {},
              }
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/managementSystem/users/all`);
            });
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
            await logout();
              history.replace(`/admin/login`);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            });
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === 'S004' || response.data.errorNum === 'S003')) {
            dispatch({ 
              type: TYPES.VALIDATION_ERRORS, payload: { 
              errors: response.data.message,
              status: response.data.status, 
            }});
            swal({
              title: "Sorry!",
              text: response.data.message,
              icon: "error",
              button: "OK",
            });
          } else {
            dispatch({ 
              type: TYPES.GENERAL_ERRORS, payload: { 
              message: response.data.message,
              errorNum: response.data.errorNum,
              status: response.data.status, 
              }
            });
          }
        }).catch((error)=> {
          if(error.hasOwnProperty('response')) {
            dispatch({ 
              type: TYPES.VALIDATION_ERRORS, payload: { 
              message: error.response.data.message,
              errors: error.response.data.errors,
              status: error.response.status, 
            }});
            console.log(error);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            }).then(async(value)=> {
              history.replace(`/managementSystem/users/addUser`);
            })
          }
        });
      } else {
        swal("The user has not been added!");
      } 
    });
  };

  function getUser() {
    // console.log(user);
    dispatch({type:TYPES.GET_USER, payload: {
      user: JSON.parse(Cookies.get('user')),
    }});
    // console.log(JSON.parse(Cookies.get('user')));
  }

  const getUserById = async (id) => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await UserAPI.get(`/${id}`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
    }).then(async(response)=> {
      console.log("get user");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_OBJECT_BY_ID, payload: { 
          user: response.data.user,
          inputsState: { ...response.data.user, ['batch_id']: response.data.user.batch.id, ['batch_number']: response.data.user.batch.number},
          message: response.data.message,
          errorNum: response.data.errorNum,
          status: response.data.status, 
        }});
      } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
        await logout();
        history.replace(`/admin/login`);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      } else {
        dispatch({ 
          type: TYPES.GENERAL_ERRORS, payload: { 
          message: response.data.message,
          errorNum: response.data.errorNum,
          status: response.data.status, 
          }
        });
      }
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error.response.data.message,
          errors: error.response.data.errors,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  const getIoTDeviceDetails = async (inputsState) => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await API.post(`/user/IoT-devices/get-device-details`, inputsState, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('user')).token_data.access_token}` },
    }).then(async(response)=> {
      console.log("get user");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('aa');
        dispatch({ 
          type: TYPES.GET_OBJECT_DETAILS, payload: { 
          IoTDeviceDetails: response.data.IoTDeviceDetails,
          message: response.data.message,
          errorNum: response.data.errorNum,
          status: response.data.status, 
        }});
      } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
        await userLogout();
        history.replace(`/login`);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      } else {
        dispatch({ 
          type: TYPES.GENERAL_ERRORS, payload: { 
          message: response.data.message,
          errorNum: response.data.errorNum,
          status: response.data.status, 
          }
        });
      }
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error.response.data.message,
          errors: error.response.data.errors,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  const updateUser = (id, inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This User will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willUpdate) => {
      if (willUpdate) {
        dispatch({ type: TYPES.SET_LOADING });
        console.log(inputsState);
        const resp = await UserAPI.post(`/${id}`, inputsState, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
        }).then(async (response) => {
          console.log("Update User");
          console.log(response);
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({ 
              type: TYPES.UPDATE_OBJECT, payload: { 
              message: response.data.message,
              errorNum: response.data.errorNum,
              status: response.data.status, 
              errors: {},
              }
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/managementSystem/users/all`);
            });
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
            await logout();
            history.replace(`/admin/login`);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            });
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === 'S004' || response.data.errorNum === 'S003')) {
            dispatch({ 
              type: TYPES.VALIDATION_ERRORS, payload: { 
              errors: response.data.message,
              status: response.data.status, 
            }});
            swal({
              title: "Sorry!",
              text: response.data.message,
              icon: "error",
              button: "OK",
            });
          } else {
            dispatch({ 
              type: TYPES.GENERAL_ERRORS, payload: { 
              message: response.data.message,
              errorNum: response.data.errorNum,
              status: response.data.status, 
              }
            });
          }
        }).catch((error)=> {
          if(error.hasOwnProperty('response')) {
            dispatch({ 
              type: TYPES.VALIDATION_ERRORS, payload: { 
              message: error.response.data.message,
              errors: error.response.data.errors,
              status: error.response.status, 
            }});
            console.log(error);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            }).then(async(value)=> {
              history.replace(`/managementSystem/users/all`);
            })
          }
        });
      } else {
        swal("The user has not been updated!");
      }
    });
  };

  const deleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This User will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {  
        dispatch({ type: TYPES.SET_LOADING });  
        const resp = await UserAPI.delete(`/${id}`, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
        }).then(async (response) => {
          console.log("Delete User");
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({
              type: TYPES.DELETE_OBJECT, payload: { 
              message: response.data.message,
              errorNum: response.data.errorNum, 
              status: response.data.status ,
            }});
            await setAlert('pink', 'User has been deleted successfully');
            await getAllUsers();
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
            await logout();
            history.replace(`/admin/login`);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            });
          } else {
            dispatch({ 
              type: TYPES.GENERAL_ERRORS, payload: { 
              message: response.data.message,
              errorNum: response.data.errorNum,
              status: response.data.status, 
              }
            });
          }
        }).catch((error)=> {
          if(error.hasOwnProperty('response')) {
            dispatch({ 
              type: TYPES.VALIDATION_ERRORS, payload: { 
              message: error.response.data.message,
              errors: error.response.data.errors,
              status: error.response.status, 
            }});
            console.log(error);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            }).then(async(value)=> {
              history.replace(`/managementSystem/users/all`);
            })
          }
        });
      } else {
        swal("The user has not been deleted!");
      }
    });
  };

  const register = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This User will be registered",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        console.log('inputsState ', inputsState);
        console.log('inputsState ', inputsState);
        console.log('inputsState ', inputsState);
        console.log('inputsState ', inputsState);
        dispatch({ type: TYPES.SET_LOADING });
        const resp = await API.post(`/user/register`, inputsState, {
          // headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('user')).token_data.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Register user");
            dispatch({ 
              type: TYPES.ADD_OBJECT, payload: { 
              message: response.data.message,
              errorNum: response.data.errorNum,
              status: response.data.status, 
              errors: {},
              }
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/login`);
            });
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
            await logout();
              history.replace(`/login`);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            });
          } else if (response.hasOwnProperty('data') && (response.data.errorNum === 'S004' || response.data.errorNum === 'S003')) {
            dispatch({ 
              type: TYPES.VALIDATION_ERRORS, payload: { 
              errors: response.data.message,
              status: response.data.status, 
            }});
            swal({
              title: "Sorry!",
              text: response.data.message,
              icon: "error",
              button: "OK",
            });
          } else {
            dispatch({ 
              type: TYPES.GENERAL_ERRORS, payload: { 
              message: response.data.message,
              errorNum: response.data.errorNum,
              status: response.data.status, 
              }
            });
          }
        }).catch((error)=> {
          if(error.hasOwnProperty('response')) {
            dispatch({ 
              type: TYPES.VALIDATION_ERRORS, payload: { 
              message: error.response.data.message,
              errors: error.response.data.errors,
              status: error.response.status, 
            }});
            console.log(error);
            swal({
              title: "Sorry!",
              text: error.response.data.message,
              icon: "error",
              button: "OK",
            }).then(async(value)=> {
              history.replace(`/login`);
            })
          }
        });
      } else {
        swal("The user has not been added!");
      } 
    });
  };

  const login = async (inputsState) => {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await API.post(`/user/login`, inputsState)
    .then((response) => {
      console.log("login");
      // console.log(response);
      if (response.data.errorNum === 'S000') {
        console.log('user', JSON.stringify(response.data.user));
        console.log('user', JSON.stringify(response.data.user));
        console.log('user', JSON.stringify(response.data.user));
        console.log('user', JSON.stringify(response.data.user));
        
        Cookies.set('user', JSON.stringify(response.data.user));
        dispatch({
          type: TYPES.LOGIN, payload: {
            user: response.data.user,
            message: response.data.message,
            errorNum: response.data.errorNum,
            status: response.data.status,
          }
        });
        history.replace(`/dashboard/IoTDevices/all`);
      } else if(response.data.errorNum === 'S001') {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          errors: {identifier: response.data.message},
          status: response.data.status, 
        }});
        swal({
          title: "Sorry!",
          text: "The given data was invalid.",
          icon: "error",
          button: "OK",
        });
      } else if(response.data.errorNum === 'S002') {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          errors: {password: response.data.message},
          status: response.data.status, 
        }});
        swal({
          title: "Sorry!",
          text: "The given data was invalid.",
          icon: "error",
          button: "OK",
        });
      }
      }).catch((error)=> {
      if(error.response) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error.response.data.message,
          errors: error.response.data.errors,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      }
    });
  };


  async function userLogout() {
    dispatch({ type: TYPES.SET_LOADING });
    
    const resp = await API.post(`/logout`, {}, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('user')).token_data.access_token}` }
    })
    .then(async(response)=> {
      console.log("logout");
      // console.log(response);
      Cookies.remove('user');
      dispatch({ 
        type: TYPES.LOGOUT, payload: {
        user: {},   
        message: response.data.message,
        errorNum: response.data.errorNum,
        status: response.data.status, 
      }});
      history.replace(`/login`)
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({ 
          type: TYPES.VALIDATION_ERRORS, payload: { 
          message: error.response.data.message,
          errors: error.response.data.errors,
          status: error.response.status, 
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error.response.data.message,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        loading: state.loading,
        loading2: state.loading2,
        message: state.message,
        status: state.status,
        errors: state.errors,
        
        users: state.users,
        IoTDeviceDetails: state.IoTDeviceDetails,
        totalUsersNo: state.totalUsersNo,
        getAllUsers,
        getUserById,
        getIoTDeviceDetails,
        getUser,
        addUser,
        updateUser,
        deleteUser,
        login,
        register,
        userLogout,

        inputsState: state.inputsState,
        inputsState2: state.inputsState2,
        setInput,
        setInput2,
        resetAllInputs,
        resetAllErrors,

      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

const userReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOADING:
      return {
        ...state,
        loading: true,
        loading2: true,
      };
    
    case TYPES.SET_INPUT_VALUE:
      return {
        ...state,
        inputsState: action.payload.inputsState ? action.payload.inputsState : {},
      };
    case TYPES.SET_INPUT_VALUE2:
      return {
        ...state,
        inputsState2: action.payload.inputsState2 ? action.payload.inputsState2 : {},
      };
    case TYPES.RESET_ALL_INPUTS:
      return {
        ...state,
        inputsState: action.payload.inputsState ? action.payload.inputsState : {},
        inputsState2: action.payload.inputsState2 ? action.payload.inputsState2 : {},
      };
    case TYPES.RESET_ALL_ERRORS:
      return {
        ...state,
        errors: action.payload.errors,
      };
    case TYPES.VALIDATION_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
      };  
    case TYPES.GENERAL_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors ? action.payload.errors : {},
        status: action.payload.status,
        loading: false,
      };
    case TYPES.LOGIN:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        errors: action.payload.errors ? action.payload.errors : {},
      };
    case TYPES.LOGOUT:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        admin: action.payload.admin ? action.payload.admin : {},
      };

    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        users: action.payload.users  ? action.payload.users: [],
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.GET_USER:
      return {
        ...state,
        user: action.payload.user ? action.payload.user : {},
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
      }; 
    case TYPES.GET_OBJECT_BY_ID:
      return {
        ...state,
        user: action.payload.user ? action.payload.user: {},
        inputsState: action.payload.inputsState ? action.payload.inputsState: {},
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.GET_OBJECT_DETAILS:
      return {
        ...state,
        IoTDeviceDetails: action.payload.IoTDeviceDetails ? action.payload.IoTDeviceDetails: {},
        message: action.payload.message,
        status: action.payload.status,
        loading2: false,
      };
    case TYPES.ADD_OBJECT:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.UPDATE_OBJECT:
      return {
        ...state,
        message: action.payload.message,
        inputsState: action.payload.inputsState,
        errors: action.payload.errors,
        status: action.payload.status,
        loading: false,
      };
    case TYPES.DELETE_OBJECT:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        loading: false,
      };
    default:
      return state;
  }
};

export {UserContext,UserState };
