import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { IoTDeviceContext } from '../../../../Context/IoTDeviceContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const IoTDevicesTable = () => {
  const { IoTDevices, deleteIoTDevice,} = useContext(IoTDeviceContext);
  const { searchResult, search } = useContext(SearchContext);

  const cols = ['Device name', 'username', 'QR code', 'Actions'];

  useEffect(() => {
    search('', IoTDevices)
  }, [])
  console.log(searchResult);
  var currentIoTDevices = [...searchResult];

  async function deleteHandler(id) {
    await deleteIoTDevice(id);
  };

  return (
    <>
      {currentIoTDevices.length>=1 ? (
        <>
          <Alert />
          <section className="flex flex-col my-5 w-full">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="divide-y divide-gray-200 w-full text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        {cols.map((col,index)=> (
                          <th key={index} scope="col" className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider`}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {currentIoTDevices.map((IoTDevice, index) => (
                        <tr key={index}>
                          {/* User */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{IoTDevice.name ? IoTDevice.name : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* User */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{IoTDevice.user && IoTDevice.user.username ? IoTDevice.user.username : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* QR Code */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{IoTDevice.QR ? IoTDevice.QR : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* IoTDevices */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-start flex-nowrap text-sm font-medium">
                            <Link to={`/managementSystem/IoTDevices/editIoTDevice/${IoTDevice.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(IoTDevice.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`There is not any IoTDevice`}</h1>
        </div>
      )}
    </>
  )
}

export default IoTDevicesTable
