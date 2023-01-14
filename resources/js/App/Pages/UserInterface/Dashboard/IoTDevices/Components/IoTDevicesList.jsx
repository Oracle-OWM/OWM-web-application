import React, {useContext, useEffect} from 'react'

import { Link } from 'react-router-dom';
import { IoTDeviceContext } from '../../../../../Context/IoTDeviceContext';
import { SearchContext } from '../../../../../Context/SearchContext';

const IoTDevicesList = ({IoTDevices}) => {
  const { loading } = useContext(IoTDeviceContext);
  const { searchResult, search } = useContext(SearchContext);
  
  useEffect(async () => {
    console.log(IoTDevices, 'before search');
    console.log(IoTDevices, 'before search');
    await search('', IoTDevices)
  }, [IoTDevices]);
  
  console.log('searchResult', searchResult);
  const currentIoTDevices = [...searchResult];
  const IoTDevicesCols = [
    // leakage devices
    currentIoTDevices.filter(IoTDevice=> IoTDevice.flow_status==='leakage'),
    // Turned Off devices 
    currentIoTDevices.filter(IoTDevice=> IoTDevice.start_read==false),
    // offline devices
    currentIoTDevices.filter(IoTDevice=> IoTDevice.connection_status==='offline'),
  ];
  console.log('IoTDevicesCols', IoTDevicesCols);
  const titles = ['Devices Include water Leakage ', 'Turned Off Devices', 'Offline Devices'];
  const colors = ['red-400', 'yellow-400', 'gray-400'];
  
  return (<>
    {IoTDevicesCols.length>=1 && IoTDevicesCols.map((IoTDevices, index) => (
      <section key={index} className="md:w-1/4 sm:w-1/2 w-full px-2">
        <h3 className={`border-l-4 px-1.5 border-${colors[index]} md:text-xl sm:text-lg text-base`}>{titles[index]} ({IoTDevices.length})</h3>
        <div className='flex flex-col gap-y-2 mt-4'>
          {IoTDevices.map((IoTDevice, index) => (
            <Link key={index}
              to={`/dashboard/IoTDevices/IoTDevice/${IoTDevice.id}`}
              className={`IoTDevice h-40 p-3 bg-white rounded-xl shadow-md hover:no-underline`}>
              <h4 className="text-center text-dark font-bold md:text-xl text-lg">{IoTDevice.name}</h4>
              <p className="font-weight-bold text-gray-500 md:text-xl text-lg capitalize"><br />Connection: {IoTDevice.connection_status}</p>
              <p className="font-weight-bold text-gray-500 md:text-xl text-lg capitalize">Water Flow Status: {IoTDevice.flow_status}</p>
            </Link>
          ))}
        </div>
      </section>
    ))}
  </>);
  
}

export default IoTDevicesList;
