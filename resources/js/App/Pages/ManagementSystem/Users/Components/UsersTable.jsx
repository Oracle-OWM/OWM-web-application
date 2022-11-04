import React, {useEffect, useContext} from 'react'
import { Link, } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { UserContext, } from '../../../../Context/UserContext';
import { SearchContext, } from '../../../../Context/SearchContext';
import Alert from '../../../../MainComponents/Alert';


const UsersTable = () => {  
  const cols = ["User", "Email", "Batch", "Actions"];
  const {  users, deleteUser  } = useContext(UserContext);
  const { searchResult, search } = useContext(SearchContext);

  useEffect(() => {
    search('', users)
  }, [])
  console.log(searchResult);
  var currentUsers = [...searchResult];
  
  async function deleteHandler(id) {
    await deleteUser(id);  
  };


  return (
    <>
      {currentUsers.length>=1 ? (
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
                      {currentUsers.map((user, index) => (
                        <tr key={index}>
                          {/* Username */}
                          <td className="py-4 whitespace-nowrap">
                            <div className="flex flex-row justify-center items-center text-left">
                              <div className="ml-4">
                                <p className="text-sm text-gray-500">{user.username ? user.username : '-'}</p>
                              </div>
                            </div>
                          </td>
                          
                          {/* Email */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{user.email ? user.email : '-'}</p>
                          </td>

                          {/* Batch */}
                          <td className="py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{user.batch ? user.batch.number : '-'}</p>
                          </td>

                          {/* Actions */}
                          <td className="py-4 pl-3 whitespace-nowrap flex justify-center flex-nowrap text-sm font-medium">
                            <Link to={`/${JSON.parse($supportedLocales).current_lang}/managementSystem/users/editUser/${user.id}`} className="bg-yellow-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><PencilAltIcon className='w-6 h-6'/></Link>
                            <button onClick={()=>deleteHandler(user.id)} className="ml-2 bg-red-light text-gray-common hover:opacity-80 p-3 rounded-full hover:no-underline"><TrashIcon className='w-6 h-6'/></button>
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
          <h1 className="text-center font-extrabold text-2xl">{`There is not any user`}</h1>
        </div>
      )}
    </>
  );
}

export default UsersTable
