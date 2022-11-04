import React, {useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { ProductContext } from '../../../../Context/ProductContext';
import { SearchContext } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';

const ProductsTable = () => {
  const { products, deleteProduct,} = useContext(ProductContext);
  const { searchResult, search } = useContext(SearchContext);

  const cols = ['Product', 'Category', 'Car Model', 'Store Name', 'City', 'Rate', 'Actions'];

  useEffect(() => {
    search('', products)
  }, [])
  console.log(searchResult);
  var currentProducts = [...searchResult];

  async function deleteHandler(id) {
    await deleteProduct(id);
  };

  return (
    <>
      {currentProducts.length>=1 ? (
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
                      {currentProducts.map((product, index) => (
                        <tr key={index}>
                          {/* name */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="flex-shrink-0 h-10 w-10">

                                {product.image ? (<img className="h-10 w-10 rounded-full" src={product.image ? `../../../../../../../${product.image}` : '-'} alt="" />) : (<UserCircleIcon className="" />)}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{product.name ? product.name : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{product.category.name ? product.category.name : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Car Model */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{product.car_model.car_manufacture ? product.car_model.car_manufacture : '-'}</p>
                              </div>
                            </div>
                          </td>


                          {/* Store Name */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{product.store_name ? product.store_name : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* City */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{product.city ? product.city : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Rate */}
                          <td className="py-4 pl-3 whitespace-nowrap">
                            <div className="flex flex-row items-left text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{product.rate ? product.rate : '-'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Products */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-start flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/products/editProduct/${product.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(product.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any product`}</h1>
        </div>
      )}
    </>
  )
}

export default ProductsTable
