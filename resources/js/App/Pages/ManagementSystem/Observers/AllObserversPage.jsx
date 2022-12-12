import React, {useEffect, useContext} from 'react'
import ObserversTable from './Components/ObserversTable';

import { ObserverContext } from '../../../Context/ObserverContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllObserversPage = () => {
  const { loading, message, getAllObservers, observers } = useContext(ObserverContext);  
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllObservers();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All Observers</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (<>
        {(!(observers.length>=1) || message==='There is not any observers') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`There is not any observers`}</h1>
          </div>
        ) : null}
          
        {observers.length >= 1 ? (
          <>
            <Search array={observers} />
            <ObserversTable />
          </>
        ) : null}
      </>)}
    </div>
  )
}

export default AllObserversPage
