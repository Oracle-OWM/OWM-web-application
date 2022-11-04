import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { CategoryContext } from '../../../../Context/CategoryContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const CategoriesTable = () => {
  const { categories, deleteCategory,} = useContext(CategoryContext);
  const { searchResult, search } = useContext(SearchContext);

  const cols = ['Category', 'Actions'];

  useEffect(() => {
    search('', categories)
  }, [])
  console.log(searchResult);
  var currentCategories = [...searchResult];

  async function deleteHandler(id) {
    await deleteCategory(id);
  };

  return (
    <>
      {currentCategories.length>=1 ? (
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
                      {currentCategories.map((category, index) => (
                        <tr key={index}>
                          {/* name */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="flex-shrink-0 h-10 w-10">

                                {category.image ? (<img className="h-10 w-10 rounded-full" src={category.image ? `../../../../../../../${category.image}` : '-'} alt="" />) : (<UserCircleIcon className="" />)}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{category.name ? category.name : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Student Activities */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-start flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/categories/editCategory/${category.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(category.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any category`}</h1>
        </div>
      )}
    </>
  )
}

export default CategoriesTable
