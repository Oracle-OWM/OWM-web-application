import React, {useContext, useEffect} from 'react'
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const IoTDeviceReadnigReadingsTable = ({readings}) => {
  const { searchResult, search } = useContext(SearchContext);

  const cols = ['Oxygen', 'Pulse Rate', 'Pressure', 'Glucose',];

  return (
    <>
      {readings && readings.length>=1 ? (
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
                      {readings.map((IoTDeviceReadnig, index) => (
                        <tr key={index}>  
                          {/* Oxygen */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{IoTDeviceReadnig.oxygen ? IoTDeviceReadnig.oxygen +'%': '-'}</p>
                              </div>
                            </div>
                          </td>


                          {/* Pulse Rate */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{IoTDeviceReadnig.pulse_rate ? IoTDeviceReadnig.pulse_rate +' / min': '-'}</p>
                              </div>
                            </div>
                          </td>


                          {/* Pressure */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{IoTDeviceReadnig.pressure ? IoTDeviceReadnig.pressure : '-'}</p>
                              </div>
                            </div>
                          </td>


                          {/* Glucose */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{IoTDeviceReadnig.sugar ? IoTDeviceReadnig.sugar : '-'}</p>
                              </div>
                            </div>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any readnig`}</h1>
        </div>
      )}
    </>
  )
}

export default IoTDeviceReadnigReadingsTable
