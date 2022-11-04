import React, {useEffect, useContext} from 'react'
import CarModelsTable from './Components/CarModelsTable';

import { CarModelContext } from '../../../Context/CarModelContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllCarModelsPage = () => {
  const { loading, message, getAllCarModels, carModels } = useContext(CarModelContext);  
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllCarModels();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All CarModels</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (<>
        {(!(carModels.length>=1) || message==='There is not any car model') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`There is not any car model`}</h1>
          </div>
        ) : null}
          
        {carModels.length >= 1 ? (
          <>
            <Search array={carModels} />
            <CarModelsTable />
          </>
        ) : null}
      </>)}
    </div>
  )
}

export default AllCarModelsPage
