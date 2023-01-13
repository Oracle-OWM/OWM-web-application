import React, {useContext, useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import { GeneralContext } from '../../../Context/GeneralContext';
import { UserContext } from '../../../Context/UserContext';

import DropdownSingleSearchList from '../../../MainComponents/DropdownSingleSearchList';
import Spinner from '../../../MainComponents/Spinner';

const UpdateUserPage = ({match}) => {
  const { loading, getUserById, updateUser, user, message, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(UserContext);
  const { getContent, content } = useContext(GeneralContext);
  
  useEffect(async () => {
    await resetAllInputs();
    await resetAllErrors();
    await getUserById(match.params.id)
    await getContent();
  }, []);

  async function updateHandler(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("first_name", inputsState.first_name);
    formData.append("last_name", inputsState.last_name);
    formData.append("username", inputsState.username);
    formData.append("email", inputsState.email);
    formData.append("phone", inputsState.phone);
    formData.append("image", inputsState.image);
    formData.append("_method", 'PUT');
    await updateUser(match.params.id, formData);
    
  };
  
  return (
    <>
    <section className="w-11/12 mx-auto my-5">
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {!loading && message === 'This user is not exist' && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`This user is not exist`}</h1>
        </div>
      )}
      
      {!loading && content && inputsState ? (
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Update User</h1>
          <form onSubmit={(e)=>updateHandler(e)} className="my-8 space-y-6 w-6/12" encType="multipart/form-data">
            <input type="hidden" name="_method" value="POST" />
            <input type="hidden" name="remember" defaultValue="true" />


            {/* First Name   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="first_name" className="capitalize md:text-lg text-xs">
                  First Name <span className='text-red'>*</span>:
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.first_name  ? inputsState.first_name: "" } id={`first_name`} name="first_name" type="text" placeholder="Enter The Full Name" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.first_name}</span>)}
              </div>
            </div>

            {/* Last Name   */}

            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="last_name" className="capitalize md:text-lg text-xs">
                  First Name <span className='text-red'>*</span>:
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.last_name  ? inputsState.last_name: "" } id={`last_name`} name="last_name" type="text" placeholder="Enter The Full Name" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.last_name}</span>)}
              </div>
            </div>

            {/* Username   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="username" className="capitalize md:text-lg text-xs">
                  Username <span className='text-red'>*</span>: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.username  ? inputsState.username: "" }  id={`username`} name="username" type="text" placeholder="Enter username" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.username}</span>)}
              </div>
            </div>

            {/* Email Address   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="email" className="capitalize md:text-lg text-xs">
                  Email Address <span className='text-red'>*</span>: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.email  ? inputsState.email: "" }  id={`email`} name="email" type="email" placeholder="Enter Email Address"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.email}</span>)}
              </div>
            </div>         

            {/* phone */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="phone" className="capitalize md:text-lg text-xs">
                  Phone Number <span className='text-red'>*</span>: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.phone  ? inputsState.phone: "" }  id={`phone`} name="phone" type="phone" placeholder="Enter Your Phone Number"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.phone}</span>)}
              </div>
            </div>

            {/* image   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="image" className="capitalize md:text-lg text-xs">
                  Upload Your Image : 
                </label>
                <input id={`image`} onChange={(e)=>setInput(e)} 
                  name="image" type="file" placeholder="Upload Image" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.image}</span>)}
              </div>
            </div>
            
            {/* Submit */}
            <div>
              <button type="submit"
                className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group:hover:text-indigo-700" aria-hidden="true" />
                </span> */}
                Update User
              </button>
            </div>
          </form>
        </div>
      ): null}

    </section>
    </>
  );
}


export default withRouter(UpdateUserPage);
