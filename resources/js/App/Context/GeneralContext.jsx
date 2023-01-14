import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import swal from 'sweetalert';
import * as TYPES from "./types";
import { API, SettingsAPI, WSbaseURL } from '../API';
import { AdminContext } from "./AdminContext";

const GeneralContext = React.createContext();
const GeneralState = (props) => {
  const { logout } = useContext(AdminContext);
  const history = useHistory();

  const initialState = {
    loading: false,
    status: 0,
    message: '',
    errors: {},
    channelMessage: null,
    inputsState: {},
    supportedLocales: {},
    content: {},
  };

  const [state, dispatch] = useReducer(generalReducer, initialState);


// let ws = new WebSocket('wss://s'+window.location.hostname+':6001/laravel-websockets/websocket-channel');
// let ws = new WebSocket('wss:/s/'+window.location.hostname+':6001/laravel-websockets');
// let ws = new WebSocket('ws://127.0.0.1:6001/laravel-websockets?channel=websocket-channel');

  function subscribeWSChannel(channel) {
      //Websocket server connection
      let ws = new WebSocket(WSbaseURL);

      //opened!
      ws.onopen = function(e) {
          console.log('opened!');
          console.log('open event',e);
          //Subscribe to the channel
          ws.send(JSON.stringify({"event":"pusher:subscribe","data":{"auth":"","channel":channel}}));
          console.log('sent!');
      }

      ws.onmessage = function(msg) {
          const message = JSON.parse(msg.data).data && JSON.parse(JSON.parse(msg.data).data).message;
          // console.log('message event',msg);
          console.log('message',message);
          Cookies.set('channelMessage', message);
          dispatch({type:TYPES.GET_MESSAGE, payload: {
            channelMessage: message,
          }});
      }
  }

  function setSettings(e) {
    let inputsState = {...state.inputsState};
    switch (e.target.name) {
      case 'holidays_file':
        inputsState = { ...inputsState, [e.target.name]: e.target.files[0], }
        break;
      default:
        console.log('normal');
        inputsState = { ...inputsState, [e.target.name]: e.target.value };
    }

    dispatch({type:TYPES.SET_INPUT_VALUE, payload: {
      inputsState: {...state.inputsState, [e.target.name]: e.target.value},
    }});
    console.log(state.inputsState);
  }

  function resetAllErrors() {
    dispatch({type:TYPES.RESET_ALL_ERRORS, payload: {
      errors: {},
    }});
    console.log(state.inputsState);
  }

  function resetAllInputs() {
    dispatch({type:TYPES.RESET_ALL_INPUTS, payload: {
      inputsState: {},
    }});
  }

  const getSupportedLocales = async () => {
    dispatch({ type: TYPES.SET_LOADING });

    const resp = await API.get(`/get-supported-locales`, {
      // headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
    }).then(async(response)=> {
      console.log("get supportedLocales");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('supportedLocales', response.data.supportedLocales);
        dispatch({
          type: TYPES.GET_SUPPORTED_LOCALES, payload: {
          supportedLocales: response.data.supportedLocales,
          message: response.data.message,
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
          status: response.data.status,
          }
        });
      }
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({
          type: TYPES.VALIDATION_ERRORS, payload: {
          message: error,
          status: error.response.status,
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  const getContent = async () => {
    dispatch({ type: TYPES.SET_LOADING });

    const resp = await API.get(`/cms/get-content`, {
      // headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
    }).then(async(response)=> {
      console.log("get content");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        console.log('content', response.data.content);
        dispatch({
          type: TYPES.GET_CONTENT, payload: {
          content: response.data.content,
          message: response.data.message,
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
          status: response.data.status,
          }
        });
      }
    }).catch((error)=> {
      if(error.hasOwnProperty('response')) {
        dispatch({
          type: TYPES.VALIDATION_ERRORS, payload: {
          message: error,
          status: error.response.status,
        }});
        console.log(error);
        swal({
          title: "Sorry!",
          text: error,
          icon: "error",
          button: "OK",
        });
      }
    });
  };

  const getSettings = async () => {
    dispatch({ type: TYPES.SET_LOADING });

    const resp = await SettingsAPI.get(`/get-settings`, {
      headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}` },
    }).then(async(response)=> {
      console.log("all settings");
      console.log(response);
      if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
        dispatch({
          type: TYPES.GET_ALL_OBJECTS, payload: {
          inputsState: response.data.settings,
          message: response.data.message,
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

  const saveSettings = (formData) => {
    swal({
      title: "Are you sure?",
      text: "Once Clicked, This settings will be updated",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willUpdate) => {
      if (willUpdate) {
        dispatch({ type: TYPES.SET_LOADING });

        const resp = await SettingsAPI.post(`/save-settings`, formData, {
          headers: { Authorization: `Bearer ${JSON.parse(Cookies.get('admin')).token_data.access_token}`, 'Content-Type': "multipart/form-data" },
        }).then(async (response) => {
          console.log("Update settings");
          console.log(response);
          if (response.hasOwnProperty('data') && response.data.errorNum === 'S000') {
            dispatch({
              type: TYPES.UPDATE_OBJECT, payload: {
              message: response.data.message,
              status: response.data.status,
              errors: {},
              }
            });
            swal({
              title: "Good job!",
              text: response.data.message,
              icon: "success",
              button: "Done!",
            })
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
              history.replace(`/settings`);
            })
          }
        });
      } else {
        swal("The setting has not been updated!");
      }
    });
  };

  return (
    <GeneralContext.Provider
      value={{
        loading: state.loading,
        message: state.message,
        status: state.status,
        errors: state.errors,
        resetAllErrors,
        resetAllInputs,

        inputsState: state.inputsState,
        getSettings,
        saveSettings,
        setSettings,

        channelMessage: state.channelMessage,
        subscribeWSChannel,

        supportedLocales: state.supportedLocales,
        getSupportedLocales,
        content: state.content,
        getContent,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

const generalReducer = (state, action) => {
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

    case TYPES.GET_CONTENT:
      return {
        ...state,
        loading: false,
        content: action.payload.content ? action.payload.content : {},
        status: action.payload.status,
        message: action.payload.message,
      };
    case TYPES.GET_SUPPORTED_LOCALES:
      return {
        ...state,
        loading: false,
        supportedLocales: action.payload.supportedLocales ? action.payload.supportedLocales : {},
        status: action.payload.status,
        message: action.payload.message,
      };

    case TYPES.GET_ALL_OBJECTS:
      return {
        ...state,
        inputsState: action.payload.inputsState ? action.payload.inputsState : [],
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
      };

    case TYPES.GET_MESSAGE:
      return {
        ...state,
        channelMessage: action.payload.channelMessage ? action.payload.channelMessage : null,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
      };
    case TYPES.UPDATE_OBJECT:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        loading: false,
      };

    default:
      return state;
  }
};

export { GeneralContext, GeneralState };
