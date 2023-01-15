import React, { useContext, useEffect, useState } from 'react'
import { IoTDeviceContext } from '../../../Context/IoTDeviceContext';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';
import UsersTable from '../../ManagementSystem/Users/Components/UsersTable';
import IoTDeviceReadnigsTable from './Components/IoTDeviceReadingsTable';
import { isObject } from 'lodash';
import Cookies from 'js-cookie';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';


const IoTDevicePage = ({match,}) => {
  const { loading, message, IoTDevice, getIoTDeviceById } = useContext(IoTDeviceContext);
  const { channelMessage, subscribeWSChannel } = useContext(GeneralContext);
  const [dashboard_IoTDevice, setIoTDeviceState] = useState({})
  
  useEffect(async () => {
    subscribeWSChannel('dashboard-IoTDevice-details-channel');
    await getIoTDeviceById(match.params.id);
  }, [match.params.id]);

  useEffect(async () => {
    // await setIoTDeviceState(Cookies.get('channelMessage'));
    await setIoTDeviceState(channelMessage);

    console.log('dashboard_IoTDevice ', Cookies.get('channelMessage'));
    console.log('dashboard_IoTDevice ', dashboard_IoTDevice);
  }, [channelMessage]);
  
  const getTime = (dateTime)=> {
    var today = new Date(dateTime);
    return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() ;
  }

  const ChildComponent = ({IoTDevice}) => {

    return (<>
      <div className='w-12/12 mx-auto rounded my-20 grid grid-flow-row gap-1 grid-cols-2 justify-between'>
        <div className='w-full'>
          <h3 className='text-xl font-semibold text-blue-dark'>Flow Rate</h3>
          <LineChart width={600} height={400} data={IoTDevice.readings && IoTDevice.readings.length>=1 && IoTDevice.readings.map((reading)=>{return {time: getTime(reading.created_at), flow_rate:reading.flow_rate}})}>
            <XAxis dataKey="time"/>
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="flow_rate" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className='w-full'>
          <h3 className='text-xl font-semibold text-blue-dark'>Liter Consumed</h3>
          <LineChart width={600} height={400} data={IoTDevice.readings && IoTDevice.readings.length>=1 && IoTDevice.readings.map((reading)=>{return {time: getTime(reading.created_at), liters_consumed:reading.liters_consumed, }})}>
            <XAxis dataKey="time"/>
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="liters_consumed" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>

      <div className="flex flex-col w-11/12 mx-auto rounded bg-white p-5">
        <div className="IoTDevice-content">
          <div className="IoTDevice-header">
            <h3 className="IoTDevice-title text-center font-extrabold md:text-lg text-base" id="exampleModalLabel">{IoTDevice.name}</h3>
            <button type="button" className="btn-close" data-bs-dismiss="IoTDevice" aria-label="Close"></button>
          </div>
          <div className="IoTDevice-body text-left flex flex-col">
            {/* Readings */}
            {IoTDevice.readings && IoTDevice.readings.length>=1 ? (
              <section id="associated-readings" className="w-full mt-5">
                <h4 className="font-bold md:text-lg text-left text-base text-blue-light capitalize">Readings</h4>
                <IoTDeviceReadnigsTable readings={ IoTDevice.readings }/>
              </section>
            ) : (<>
              <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-center font-extrabold text-2xl">{`There is not any readings`}</h1>
              </div>
            </>)}

            {/* associated-users */}
            {IoTDevice.users && IoTDevice.users.length>=1 && (
              <section id="associated-users" className="w-full mt-5">
                <h4 className="font-bold md:text-lg text-left text-base -mb-8 text-blue-light capitalize">Associated Users</h4>
                <UsersTable associated={true} users={ IoTDevice.users }/>
              </section>
            )}
          </div>      
        </div>
      </div>
    </>);
  }

  return (
    <section className="w-11/12 mx-auto my-5">      
      <h1 className="text-lg font-bold text-blue-dark mb-5">Dashboard</h1>
      
      {loading && (<>
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      </>)}

      {!loading && dashboard_IoTDevice && isObject(dashboard_IoTDevice) ? (<>
        <ChildComponent  IoTDevice={dashboard_IoTDevice}/>
      </>) : !loading && IoTDevice ? (<>
        <ChildComponent  IoTDevice={IoTDevice}/>
      </>) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`There is not any device`}</h1>
        </div>
      )}
      
    </section>      
  )
}

export default withRouter(IoTDevicePage);
