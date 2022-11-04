import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/solid';
import { CarModelContext } from '../../../../Context/CarModelContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const CarModelsTable = () => {
  const { carModels, deleteCarModel,} = useContext(CarModelContext);
  const { searchResult, search } = useContext(SearchContext);
  
  const cols = ['Car Manufacture', 'Model Name', 'Car Year', 'Actions'];

  useEffect(() => {
    search('', carModels)
  }, [])
  console.log(searchResult);
  var currentCarModels = [...searchResult];
  
  async function deleteHandler(id) {
    await deleteCarModel(id); 
  };
  
  return (<>
    {currentCarModels.length>=1 ? (
      <>
        <Alert />
        <section className="flex flex-col my-5 w-full">
          <div className="overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="divide-y divide-gray-200 w-full text-center">
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
                    {currentCarModels.map((carModel, index) => (
                      <tr key={index}>
                        {/* Car Manufacture */}
                        <td className="py-4 pl-3 whitespace-nowrap">
                          <div className="flex flex-row items-left text-left">
                            <div className="flex-shrink-0 h-10 w-10">
                              {carModel.image ? (<img className="h-10 w-10 rounded-full" src={carModel.image ? `../../../../../../../${carModel.image}` : '-'} alt="" />) : (<UserCircleIcon className="" />)}
                            </div>
                            <div className="ml-4">
                              <p className="text-sm text-gray-500">{carModel.car_manufacture ? carModel.car_manufacture : '-'}</p>
                            </div>
                          </div>
                        </td>

                        {/* Car Year */}
                        <td className="py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{carModel.car_year ? carModel.car_year : '-'}</p>
                        </td>

                        {/* Model Name */}
                        <td className="py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900">{carModel.model_name ? carModel.model_name : '-'}</p>
                        </td>
                        
                        {/* Actions */}
                        <td className="py-4 pl-3 whitespace-nowrap flex justify-center flex-nowrap text-sm font-medium">
                          <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/carModels/editCarModel/${carModel.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                          <button onClick={()=>deleteHandler(carModel.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
        <h1 className="text-center font-extrabold text-2xl">{`There is not any car model`}</h1>
      </div>
    )}
  </>)
}

export default CarModelsTable
