import React, {useContext, useEffect, useState} from 'react'
import { GeneralContext } from '../../../Context/GeneralContext';
import { UserContext } from '../../../Context/UserContext';
import Spinner from '../../../MainComponents/Spinner';
import DropdownSingleSearchList from './../../../MainComponents/DropdownSingleSearchList';

const AddUserPage = () => {
  const { loading, addUser, errors, setInput, inputsState, resetAllInputs, resetAllErrors } = useContext(UserContext);
  const { getContent, content } = useContext(GeneralContext);

  useEffect(async() => {
    await resetAllInputs();
    await resetAllErrors();
    await getContent();
  }, []);

  async function addHandler(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("full_name", inputsState.full_name);
    formData.append("username", inputsState.username);
    formData.append("email", inputsState.email);
    formData.append("password", inputsState.password);
    formData.append("phone", inputsState.phone);
    formData.append("batch_id", inputsState.batch_id);
    formData.append("group", inputsState.group);
    formData.append("section", inputsState.section);
    formData.append("image", inputsState.image);
    await addUser(formData);    
  };

  
  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      )}

      {/* {!loading && batches.length<1 && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`There's no batches available`}</h1>
        </div>
      )}

      {!loading && departments.length<1 && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-center font-extrabold text-2xl">{`There's no departments available`}</h1>
        </div>
      )} */}

      {!loading && content && inputsState ? (
      <section className="w-11/12 mx-auto my-5">
        <div className="flex flex-col w-8/12 mx-auto rounded items-center bg-white">
          <h1 className="bg-blue-light p-3 w-9/12 rounded text-white z-10 -mt-5 md:text-2xl text-base">Add User</h1>
          <form onSubmit={(e)=>addHandler(e)} className="my-8 space-y-6 w-6/12" encType="multipart/form-data">
            <input type="hidden" name="_method" value="POST" />
            <input type="hidden" name="remember" defaultValue="true" />

            {/* Full Name   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="full_name" className="capitalize md:text-lg text-xs">
                  Full Name <span className='text-red'>*</span>:
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.full_name  ? inputsState.full_name: "" } id={`full_name`} name="full_name" type="text" placeholder="Enter The Full Name" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.full_name}</span>)}
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

            {/* Password   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="password" className="capitalize md:text-lg text-xs">
                  Password <span className='text-red'>*</span>: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.password  ? inputsState.password: "" }  id={`password`} name="password" type="password" placeholder="Password must be 8 charachters at least"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.password}</span>)}
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

            {/* Department   */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="department_id" className="capitalize md:text-lg text-xs">
                  Department <span className='text-red-common'>*</span>:
                </label>

                <DropdownSingleSearchList defaultArray={inputsState.department_id ? [departments.map((department)=>{return {id: department.id, name: department.title}}).find((department)=>department.id===Number(inputsState.department_id))] : []} name='department_id' array={departments.map((department)=>{return {id: department.id, name: department.title}})} setInput={setInput} />

                {errors && (<span className="text-red-common p-3">{errors.department_id}</span>)}
              </div>
            </div>

            {/* batch_id   */}
            {inputsState.department_id && (<>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-4">
                  <label htmlFor="batch_id" className="capitalize md:text-lg text-xs">
                    Batch <span className='text-red'>*</span>: 
                  </label>
                  <DropdownSingleSearchList defaultArray={inputsState.batch_id ? [{id:inputsState.batch_id, name: batches.find(batch=>batch.id==Number(inputsState.batch_id)).number}] : []} name='batch_id' array={batches.filter((batch)=>batch.department_id===Number(inputsState.department_id)).map((batch)=>{return {id:batch.id, name:batch.number}})} setInput={setInput} />
                  {errors && (<span className="text-red-common p-3">{errors.batch_id}</span>)}
                </div>
              </div>
            </>)}

            {/* group */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="group" className="capitalize md:text-lg text-xs">
                  group: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.group  ? inputsState.group: "" }  id={`group`} name="group" type="text" placeholder="Enter Your Group" 
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.group}</span>)}
              </div>
            </div>

            {/* Section */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-4">
                <label htmlFor="section" className="capitalize md:text-lg text-xs">
                  Section <span className='text-red'>*</span>: 
                </label>
                <input onChange={(e)=>setInput(e)} value={inputsState.section  ? inputsState.section: "" }  id={`section`} name="section" type="number" placeholder="Enter Your Section"
                  className=" bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
                {errors && (<span className="text-red-common p-3">{errors.section}</span>)}
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
                Add User
              </button>
            </div>
          </form>
        </div>
      </section>
    ): null}
    </>
  );
}


export default AddUserPage
