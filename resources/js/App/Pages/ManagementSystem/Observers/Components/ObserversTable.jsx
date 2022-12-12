import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { ObserverContext } from '../../../../Context/ObserverContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const ObserversTable = () => {
  const { observers, deleteObserver,} = useContext(ObserverContext);
  const { searchResult, search } = useContext(SearchContext);
  
  const cols = ['Observer', 'Location', 'Phone Number', 'Actions'];

  useEffect(() => {
    search('', observers)
  }, [])
  console.log(searchResult);
  var currentObservers = [...searchResult];
  
  async function deleteHandler(id) {
    await deleteObserver(id); 
  };
  
  return (
    <>
      {currentObservers.length>=1 ? (
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
                      {currentObservers.map((observer, index) => (
                        <tr key={index}>
                          {/* Name */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="flex-shrink-0 h-10 w-10">
                                {observer.image ? (<img className="h-10 w-10 rounded-full" src={observer.image ? `../../../../../../../${observer.image}` : '-'} alt="" />) : ('-')}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{observer.first_name && observer.last_name ? observer.first_name+' '+observer.last_name : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{observer.country && observer.city_area ? observer.city_area+' - '+observer.country : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Phone Number */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{observer.phone ? observer.phone : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-start flex-nowrap text-sm font-medium">
                            <Link to={`/managementSystem/observers/editObserver/${observer.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(observer.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any observer`}</h1>
        </div>
      )}
    </>
  )
}

export default ObserversTable
