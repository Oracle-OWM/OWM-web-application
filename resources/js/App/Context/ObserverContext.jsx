import React, { useReducer, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from 'sweetalert';
import * as TYPES from "./types";
import { ObserverAPI } from '../API';
import { AlertContext } from "./AlertContext";
import { AdminContext } from "./AdminContext";

const ObserverContext = React.createContext();
const ObserverState = (props) => {
  const history = useHistory();
  const { logout } = useContext(AdminContext);
  const { setAlert } = useContext(AlertContext);

  const initialState = {
    loading: false,
    status: 0,
    message: '',
    errors: {},
    auth: false,
    observer: {},
    observers: [],
    inputsState: {},
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  async function setInput(e) {
    let inputsState = { ...state.inputsState };
    switch (e.target.name) {
      case 'image':
        inputsState = { ...inputsState, [e.target.name]: e.target.files[0], }
        break;
      default:
        console.log('normal');
        inputsState = { ...inputsState, [e.target.name]: e.target.value };
    }
    await dispatch({type:TYPES.SET_INPUT_VALUE, payload: {
      inputsState: inputsState
    }});
    console.log(state.inputsState);
  }

  function resetAllInputs() {
    dispatch({type:TYPES.RESET_ALL_INPUTS, payload: {
      inputsState: {},
    }});
  }

  function resetAllErrors() {
    dispatch({type:TYPES.RESET_ALL_ERRORS, payload: {
      errors: {},
    }});
    console.log(state.inputsState);
  }

  const getAllObservers = async () => {
    dispatch({ type: TYPES.SET_LOADING });

    const resp = await ObserverAPI.get(`/`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` }
    }).then(async (response) => {
      console.log("all observers");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({
          type: TYPES.GET_ALL_OBJECTS, payload: {
            observers: response.data.observers,
            message: response.data.message,
            status: response.data.status,
        }});
      } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
        await logout();
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


  const getObserverById = async (id) => {
    dispatch({ type: TYPES.SET_LOADING });

    const resp = await ObserverAPI.get(`/${id}`, {
      params: { id: id },
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
    }).then(async (response) => {
      console.log("get observer");
      console.log(response.data);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({
          type: TYPES.GET_OBJECT_BY_ID, payload: {
          observer: response.data.observer,
          inputsState: response.data.observer,
          message: response.data.message,
          status: response.data.status,
        }});
      } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
        await logout();
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

  const addObserver = async (inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This observer will be added",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willAdd) => {
      if (willAdd) {
        dispatch({ type: TYPES.SET_LOADING });

        const resp = await ObserverAPI.post(`/`, inputsState, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
        }).then(async (response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Add observer");
            dispatch({
              type: TYPES.ADD_OBJECT, payload: {
              message: response.data.message,
              status: response.data.status,
              errors: {},
            }});

            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/managementSystem/observers/all`);
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
              text: "The given data was invalid.",
              icon: "error",
              button: "OK",
            });
          } else {
            dispatch({
              type: TYPES.GENERAL_ERRORS, payload: {
              message: response.data.message,
              status: response.data.status,
              }
            });
            swal({
              title: "Sorry!",
              text: "Something went wrong.",
              icon: "error",
              button: "OK",
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
              history.replace(`/managementSystem/observers/addObserver`);
            });
          }
        });
      } else {
        swal("The observer has not been added!");
      }
    });
  };

  const updateObserver = async (id, inputsState) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This observer will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willAdd) => {
      if (willAdd) {
        dispatch({ type: TYPES.SET_LOADING });

        const resp = await ObserverAPI.post(`/${id}`, inputsState, {
          params: { id: id },
          headers: {
            ContentType: 'multipart/form-data',
            Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
        }).then(async(response) => {
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            console.log("Update admin");
            console.log(response.data);
            dispatch({
              type: TYPES.UPDATE_OBJECT, payload: {
              message: response.data.message,
              status: response.data.status,
              errors: {},
            }});

            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            }).then(async(value)=> {
              history.replace(`/managementSystem/observers/all`);
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
              text: "The given data was invalid.",
              icon: "error",
              button: "OK",
            });
          } else {
            dispatch({
              type: TYPES.GENERAL_ERRORS, payload: {
              message: response.data.message,
              status: response.data.status,
              }
            });
            swal({
              title: "Sorry!",
              text: "Something went wrong.",
              icon: "error",
              button: "OK",
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
              history.replace(`/managementSystem/observers/editObserver/${id}`);
            });
          }
        });
      } else {
        swal("The observer has not been updated!");
      }
    });
  };

  const deleteObserver = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This observer will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
        dispatch({ type: TYPES.SET_LOADING });
        const resp = await ObserverAPI.delete(`/${id}`, {
          params: { id: id },
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
        }).then(async (response) => {
          console.log("Delete observer");
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({
              type: TYPES.DELETE_OBJECT, payload: {
              message: response.data.message,
              status: response.data.status ,
            }});
            await setAlert('blue', 'observer has been deleted successfully');
            await getAllObservers();

          } else if (response.hasOwnProperty('data') && (response.data.errorNum === "E3001" || response.data.errorNum === "E3002" || response.data.errorNum === "E3003")) {
            await logout();
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
              status: response.data.status,
              }
            });
            swal({
              title: "Sorry!",
              text: "Somthing went wrong.",
              icon: "error",
              button: "OK",
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
            }).then(async (value) => {
              history.replace(`/managementSystem/observers/all`);
            })
          }
        });
      } else {
        swal("The observer has not been deleted!");
      }
    });
  };


  return (
    <ObserverContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,

        observer: state.observer,
        observers: state.observers,
        getAllObservers,
        getObserverById,
        addObserver,
        updateObserver,
        deleteObserver,

        inputsState: state.inputsState,
        setInput,
        resetAllInputs,
        resetAllErrors,

      }}
    >
      {props.children}
    </ObserverContext.Provider>
  );
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case TYPES.SET_INPUT_VALUE:
      return {
        ...state,
        inputsState: action.payload.inputsState ? action.payload.inputsState : {},
      };
    case TYPES.RESET_ALL_INPUTS:
      return {
        ...state,
        inputsState: action.payload.inputsState ? action.payload.inputsState : {},
      };
    case TYPES.VALIDATION_ERRORS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        errors: action.payload.errors,
      };
    case TYPES.RESET_ALL_ERRORS:
      return {
        ...state,
        errors: action.payload.errors,
      };
    case TYPES.GENERAL_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        errors: action.payload.errors ? action.payload.errors : {},
        status: action.payload.status,
        loading: false,
      };
    case TYPES.ADD_OBJECT:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        errors: action.payload.errors,
        inputsState: action.payload.inputsState,
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

    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        observers: action.payload.observers  ? action.payload.observers: [],
      };
    case TYPES.GET_OBJECT_BY_ID:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
        observer: action.payload.observer ? action.payload.observer: {},
        inputsState: action.payload.inputsState ? action.payload.inputsState: {},
      };
    case TYPES.GET_OBJECT_BY_ID_ERRORS:
      return {
        ...state,
        loading: false,
        status: action.payload.status,
        message: action.payload.message,
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

export { ObserverContext, ObserverState };
