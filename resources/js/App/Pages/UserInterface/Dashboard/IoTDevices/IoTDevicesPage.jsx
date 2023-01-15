import React, {useContext, useEffect, useState} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Cookies from 'js-cookie';
import { isArray, isEmpty } from 'lodash';
import { IoTDeviceContext } from '../../../../Context/IoTDeviceContext';
import { GeneralContext } from '../../../../Context/GeneralContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Spinner from '../../../../MainComponents/Spinner';
import { Link } from 'react-router-dom';
import DropdownSingleSearchList from '../../../../MainComponents/DropdownSingleSearchList';
import { UserContext } from '../../../../Context/UserContext';

const IoTDevicesPage = () => {
  const { loading, message, getAllUserIoTDevices, IoTDevices, } = useContext(IoTDeviceContext);  
  const { getCommonObjects } = useContext(SearchContext);  
  const { channelMessage, subscribeWSChannel } = useContext(GeneralContext);
  const { loading2, errors, inputsState, setInput, getIoTDeviceDetails, IoTDeviceDetails  } = useContext(UserContext);
  const [dashboard_IoTDeviceDetails, setIoTDeviceDetailsState] = useState([])

  const submitHandler = async(e) => {
    e.preventDefault();
    await getIoTDeviceDetails(inputsState)

  }

  const getTime = (dateTime)=> {
    var today = new Date(dateTime);
    return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() ;
  }
  
  useEffect(async () => {
    subscribeWSChannel('dashboard-IoTDevice-details-channel');
    await getAllUserIoTDevices();
  }, []);

  useEffect(async () => {
    await setIoTDeviceDetailsState(Cookies.get('channelMessage'));
    // await setIoTDeviceDetailsState(channelMessage);

    console.log('IoTDevices2 ', IoTDevices);
    console.log('dashboard_IoTDeviceDetails2 ', Cookies.get('channelMessage'));
    console.log('dashboard_IoTDeviceDetails2 ', dashboard_IoTDeviceDetails);
  // }, [Cookies.get('channelMessage')]);
  }, [channelMessage]);

  const ChildComponent = ({IoTDevices}) => {
    
    const IoTDeviceDetailsComponent = ({IoTDeviceDetails}) => {
      console.log('Details', IoTDeviceDetails);
      console.log('Details', IoTDeviceDetails);
      console.log('Details', IoTDeviceDetails);
      console.log('Details', IoTDeviceDetails);
      console.log('Details', IoTDeviceDetails);
      console.log('Details', IoTDeviceDetails);
      console.log('Details', IoTDeviceDetails);
      console.log('Details', IoTDeviceDetails);
      return (<>
      
        <section className='w-full'>
          <BarChart
            width={900}
            height={500}
            data={IoTDeviceDetails.readings && IoTDeviceDetails.readings.length>=1 && IoTDeviceDetails.readings.map((reading)=>{return {time: getTime(reading.created_at), liters_consumed:reading.liters_consumed, flow_rate:reading.flow_rate, }})}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="flow_rate" fill="#8884d8" />
            <Bar dataKey="liters_consumed" fill="#82ca9d" />
          </BarChart>
        </section>
      </>)
    }
    return (<>
      <div className='grid grid-flow-col w-full grid-cols-2 mt-5 gap-y-5 lg:justify-between justify-start'>
        {(!loading && inputsState && (<>
          <section className='w-2/3 '>
            <div className='w-full'>           
              <h2 className='text-2xl  text-left text-blue-dark font-semibold'>Choose the Meter and Time Period:</h2>
              <form className='my-8 space-y-6 ' onSubmit={(e)=>submitHandler(e)} encType="multipart/form-data">
                <input type="hidden" name="_method" value="POST" />
                <input type="hidden" name="remember" defaultValue="true" />

                {/* Device   */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mt-4 grid grid-flow-col grid-cols-2">
                    <label htmlFor="device_id" className="capitalize md:text-lg text-xs">
                      Choose a meter device <span className='text-red-common'>*</span>:
                    </label>
                    <DropdownSingleSearchList setInput={setInput} name='device_id' array={IoTDevices} defaultArray={inputsState && inputsState.device_id ? [IoTDevices.find((IoTDevice)=> inputsState.device_id===IoTDevice.id)] : []} />
                    {errors && (<span className="text-red-common py-3">{errors.device_id}</span>)}
                  </div>
                </div>

                {/* Start Date   */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mt-4 grid grid-flow-col grid-cols-2">
                    <label htmlFor="start_date" className="capitalize md:text-lg text-xs">
                      Choose the start date <span className='text-red-common'>*</span>:
                    </label>
                    <input onChange={(e)=>setInput(e)} value={inputsState.start_date  ? inputsState.start_date : "" }
                      id={`start_date`} name="start_date" type="datetime-local" placeholder="Enter The Name"
                      className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    />
                    {errors && (<span className="text-red-common py-3">{errors.start_date}</span>)}
                  </div>
                </div>

                {/* End Date   */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mt-4 grid grid-flow-col grid-cols-2">
                    <label htmlFor="end_date" className="capitalize md:text-lg text-xs">
                      Choose the end date <span className='text-red-common'>*</span>:
                    </label>
                    <input onChange={(e)=>setInput(e)} value={inputsState.end_date  ? inputsState.end_date : "" }
                      id={`end_date`} name="end_date" type="datetime-local" placeholder="Enter The Name"
                      className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    />
                    {errors && (<span className="text-red-common py-3">{errors.end_date}</span>)}
                  </div>
                </div>

                {/* Submit   */}
                <div>
                  <button type="submit" className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Show Details
                  </button>
                </div>
              </form>
            </div> 
          </section>
        </>))}

        {IoTDeviceDetails  ? (<>
          <IoTDeviceDetailsComponent IoTDeviceDetails={IoTDeviceDetails}/>
        </>) : dashboard_IoTDeviceDetails && (<>
          <IoTDeviceDetailsComponent IoTDeviceDetails={dashboard_IoTDeviceDetails}/>
        </>)}
      </div> 
    </>);
  }


  return (<>
    <section className="w-11/12 mx-auto my-5">      
      <h1 className="text-lg font-bold text-blue-dark mb-5">Dashboard</h1>
      
      {loading && (<>
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      </>)}

      {!loading && IoTDevices && IoTDevices.length>=1 ? (<>
        <ChildComponent IoTDevices={IoTDevices} />
      </>) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`There is not any device`}</h1>
        </div>
      )}

      {IoTDeviceDetails && !isEmpty(IoTDeviceDetails) && (<>
      sd
      </>)}
      
    </section>
  </>);
}

export default IoTDevicesPage
