import React, {useContext, useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import { GeneralContext } from '../../../Context/GeneralContext';

import { IoTDeviceContext } from '../../../Context/IoTDeviceContext';
import Spinner from '../../../MainComponents/Spinner';
import IoTDeviceReadingsTable from './Components/IoTDeviceReadingsTable';



const ShowIoTDeviceReadings = ({match}) => {
  const { loading, getIoTDeviceById, IoTDevice, updateIoTDevice, message, resetAllInputs, resetAllErrors } = useContext(IoTDeviceContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getIoTDeviceById(match.params.id);
    await getContent();
  }, []);

  async function changeCheckupStatus(status) {
    await updateIoTDevice(match.params.id, {
      name: IoTDevice.name,
      start_read: status
    });
  };

  return (<>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {!loading && message === 'This device is not exist' && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`This device is not exist`}</h1>
        </div>
      )}

      {(!loading && content && (<>
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Start Checkup</h1>
            {/* Submit   */}
            <div>
              <button onClick={()=>changeCheckupStatus(true)} className="group btn-outline bg-blue-400 text-white relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Start Checkup
              </button>
            </div>

            <IoTDeviceReadingsTable readings={IoTDevice.readings}/>
        </div>
      </>))}
    </section>
  </>);
}


export default withRouter(ShowIoTDeviceReadings);
