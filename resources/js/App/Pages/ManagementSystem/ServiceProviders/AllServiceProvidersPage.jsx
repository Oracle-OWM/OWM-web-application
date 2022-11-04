import React, {useEffect, useContext} from 'react'
import ServiceProvidersTable from './Components/ServiceProvidersTable';

import { ServiceProviderContext } from '../../../Context/ServiceProviderContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllServiceProvidersPage = () => {
  const { loading, message, getAllServiceProviders, serviceProviders } = useContext(ServiceProviderContext);  
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllServiceProviders();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All ServiceProviders</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (<>
        {(!(serviceProviders.length>=1) || message==='There is not any department') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`There is not any department`}</h1>
          </div>
        ) : null}
          
        {serviceProviders.length >= 1 ? (
          <>
            <Search array={serviceProviders} />
            <ServiceProvidersTable />
          </>
        ) : null}
      </>)}
    </div>
  )
}

export default AllServiceProvidersPage
