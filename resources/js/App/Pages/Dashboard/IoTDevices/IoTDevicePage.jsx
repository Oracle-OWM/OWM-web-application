import React, { useContext, useEffect } from 'react'
import { IoTDeviceContext } from '../../../Context/IoTDeviceContext';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';
import UsersTable from '../../ManagementSystem/Users/Components/UsersTable';
import IoTDeviceReadnigsTable from './Components/IoTDeviceReadingsTable';

const IoTDevicePage = ({match,}) => {
  const { getContent, content } = useContext(GeneralContext);
  const { loading, message, IoTDevice, getIoTDeviceById } = useContext(IoTDeviceContext);
  
  useEffect(async () => {
    await getIoTDeviceById(match.params.id);
    await getContent();
  }, [match.params.id])
  
  return (
    <section className="w-11/12 mx-auto my-5">
      <div className="flex flex-col w-11/12 mx-auto rounded bg-white p-5">
        {loading && (
          <div className="flex flex-col justify-center items-center h-screen">
            <Spinner />
          </div>
        )}
        {!loading && content && message === 'Device has been returned successfully' && (
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
        )}
      </div>
    </section>
  )
}

export default withRouter(IoTDevicePage);
