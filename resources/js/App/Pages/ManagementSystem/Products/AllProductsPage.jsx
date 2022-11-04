import React, {useEffect, useContext} from 'react'
import ProductsTable from './Components/ProductsTable';

import { ProductContext } from '../../../Context/ProductContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllProductsPage = () => {
  const { loading, message, getAllProducts, products } = useContext(ProductContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllProducts();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All Products</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (<>
        {(!(products.length>=1) || message==='There is not any product') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`There is not any product`}</h1>
          </div>
        ) : null}

        {products.length >= 1 ? (
          <>
            <Search array={products} />
            <ProductsTable />
          </>
        ) : null}
      </>)}
    </div>
  )
}

export default AllProductsPage
