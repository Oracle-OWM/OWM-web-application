import React, {useEffect, useContext} from 'react'
import CategoriesTable from './Components/CategoriesTable';

import { CategoryContext } from '../../../Context/CategoryContext';
import Search from '../../../MainComponents/Search';
import Spinner from '../../../MainComponents/Spinner';
import { GeneralContext } from '../../../Context/GeneralContext';

const AllCategoriesPage = () => {
  const { loading, message, getAllCategories, categories } = useContext(CategoryContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async () => {
    await getAllCategories();
    await getContent();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h1 className="text-lg text-blue-dark mb-5">All Categories</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : !loading && content && (<>
        {(!(categories.length>=1) || message==='There is not any category') ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-center font-extrabold text-2xl">{`There is not any category`}</h1>
          </div>
        ) : null}

        {categories.length >= 1 ? (
          <>
            <Search array={categories} />
            <CategoriesTable />
          </>
        ) : null}
      </>)}
    </div>
  )
}

export default AllCategoriesPage
