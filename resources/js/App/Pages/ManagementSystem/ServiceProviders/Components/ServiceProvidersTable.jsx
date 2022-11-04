import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { ServiceProviderContext } from '../../../../Context/ServiceProviderContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const ServiceProvidersTable = () => {
  const { serviceProviders, deleteServiceProvider,} = useContext(ServiceProviderContext);
  const { searchResult, search } = useContext(SearchContext);
  
  const cols = ['Service Provider', 'Actions'];

  useEffect(() => {
    search('', serviceProviders)
  }, [])
  console.log(searchResult);
  var currentServiceProviders = [...searchResult];
  
  async function deleteHandler(id) {
    await deleteServiceProvider(id); 
  };
  
  return (
    <>
      {currentServiceProviders.length>=1 ? (
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
                      {currentServiceProviders.map((serviceProvider, index) => (
                        <tr key={index}>
                          {/* title */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="flex-shrink-0 h-10 w-10">
                                
                                {serviceProvider.image ? (<img className="h-10 w-10 rounded-full" src={serviceProvider.image ? `../../../../../../../${serviceProvider.image}` : '-'} alt="" />) : ('-')}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{serviceProvider.title ? serviceProvider.title : '-'}</p>
                              </div>
                            </div>
                          </td>
                          
                          {/* Actions */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-start flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/serviceProviders/editServiceProvider/${serviceProvider.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(serviceProvider.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any serviceProvider`}</h1>
        </div>
      )}
    </>
  )
}

export default ServiceProvidersTable
