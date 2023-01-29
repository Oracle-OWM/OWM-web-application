import { LockClosedIcon } from '@heroicons/react/solid';
import React, {useContext, useEffect} from 'react'
import { UserContext } from '../../Context/UserContext';
import Navbar from '../../MainComponents/Navbar';
import Cookies from 'js-cookie';

const LoginRegistrationPage = () => {
    const { loading, errors, errorNum, login, register, setInput, inputsState,  resetAllInputs, resetAllErrors, } = useContext(UserContext);

    useEffect(async() => {
        if(Cookies.get('user')) {
            history.replace(`/dashboard/IoTDevices/all`);
        }
        await resetAllInputs();
        await resetAllErrors();
    }, []);

    async function loginHandler(e) {
        e.preventDefault();
        await login(inputsState);
    };

    async function RegisterHandler(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("first_name", inputsState.first_name);
        formData.append("last_name", inputsState.last_name);
        formData.append("username", inputsState.username);
        formData.append("email", inputsState.email);
        formData.append("password", inputsState.password);
        formData.append("phone", inputsState.phone);
        formData.append("image", inputsState.image);

        await register(formData);

    };

    return (<>
        <Navbar />

        {errorNum==='S000' && (
            <div id="alert" className="bg-blue-300 mt-2 w-4/5 mx-auto border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                        <p className="font-bold">تم انشاء الحساب بنجاح</p>
                        <p className="text-sm">يمكنك تسجيل الدخول</p>
                    </div>
                </div>
            </div>
        )}

        {errorNum==='S002' && (
            <div id="alert" className=" bg-blue-400 mt-2 w-4/5 mx-auto border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                        <p className="font-bold">Registration Failed</p>
                        <p className="text-sm">Please check the data you entered</p>
                    </div>
                </div>
            </div>
        )}

        <main className="relative w-full flex flex-col items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
            <div className="container px-5 py-24 mx-auto">
                <div className="w-full mx-auto flex flex-wrap md:flex-row flex-col justify-center items-start">
                    <form  method="POST"  onSubmit={(e)=>loginHandler(e)} className="mx-auto  my-8 w-8/12 md:w-4/12" encType="multipart/form-data">
                        <input type="hidden" name="_method" value="POST" />
                        <input type="hidden" name="remember" defaultValue="true" />
                        <h3 style={{lineHeight: 1.2}} className="lg:text-start lg:w-auto w-full text-center font-semibold text-5xl text-blue-dark">Sign In</h3>

                        {/* identifier */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                            <label htmlFor="identifier" className="capitalize md:text-lg text-xs">
                                Username / Email :
                            </label>
                            <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.identifier : ''} id={`identifier`} name="identifier" type="text" placeholder="Enter Your Email Address or Username"
                                className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            {errors && (<span className="text-red-600 p-3">{errors.identifier}</span>)}
                            </div>
                        </div>

                        {/* password */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                            <label htmlFor="password" className="capitalize md:text-lg text-xs">
                            password :
                            </label>
                            <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.password : ''} id={`password`} name="password" type="password" placeholder="Enter Your Password"
                                className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            {errors && (<span className="text-red-600 p-3">{errors.password}</span>)}
                            </div>
                        </div>

                        {/* Submit */}
                        <div>
                            <button type="submit"
                                className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    <span className="bg-gray-300 rounded-full mx-auto d-inline-block border-1 p-10 text-center my-32">OR</span>

                    <form  method="POST" onSubmit={(e)=>RegisterHandler(e)} className="mx-auto  my-8 w-8/12 md:w-4/12" encType="multipart/form-data">
                        <input type="hidden" name="_method" value="POST" />
                        <input type="hidden" name="remember" defaultValue="true" />
                        <h3 style={{lineHeight: 1.2}} className="lg:text-start lg:w-auto w-full text-center font-semibold text-5xl text-blue-dark">Create Account</h3>

                        {/* first_name */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                            <label htmlFor="first_name" className="capitalize md:text-lg text-xs">
                                First Name :
                            </label>
                            <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.first_name : ''} id={`first_name`} name="first_name" type="text" placeholder="Enter Your First Name"
                                className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            {errors && (<span className="text-red-600 p-3">{errors.first_name}</span>)}
                            </div>
                        </div>

                        {/* last_name */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                            <label htmlFor="last_name" className="capitalize md:text-lg text-xs">
                                Last Name :
                            </label>
                            <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.last_name : ''} id={`last_name`} name="last_name" type="text" placeholder="Enter Your Last Name"
                                className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            {errors && (<span className="text-red-600 p-3">{errors.last_name}</span>)}
                            </div>
                        </div>

                        {/* username */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                            <label htmlFor="username" className="capitalize md:text-lg text-xs">
                                Username :
                            </label>
                            <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.username : ''} id={`username`} name="username" type="text" placeholder="Enter Your Username"
                                className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            {errors && (<span className="text-red-600 p-3">{errors.username}</span>)}
                            </div>
                        </div>

                        {/* email */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                                <label htmlFor="email" className="capitalize md:text-lg text-xs">
                                    Email Address <span className='text-red-600'>*</span>:
                                </label>
                                <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.email : ''} id={`email`} name="email" type="email" placeholder="Enter Your Email Address"
                                    className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                />
                                {errors && (<span className="text-red-600 p-3">{errors.email}</span>)}
                            </div>
                        </div>

                        {/* password */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                                <label htmlFor="password" className="capitalize md:text-lg text-xs">
                                    Password <span className='text-red-600'>*</span>:
                                </label>
                                <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.password : ''} id={`password`} name="password" type="password" placeholder="Enter Your Password at least 8 characters"
                                    className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                />
                                {errors && (<span className="text-red-600 p-3">{errors.password}</span>)}
                            </div>
                        </div>

                        {/* phone */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                                <label htmlFor="phone" className="capitalize md:text-lg text-xs">
                                    Phone Number <span className='text-red-600'>*</span>:
                                </label>
                                <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.phone : ''} id={`phone`} name="phone" type="text" placeholder="Enter Your Password at least 8 characters"
                                    className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                />
                                {errors && (<span className="text-red-600 p-3">{errors.phone}</span>)}
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
                            {errors && (<span className="text-red-600 p-3">{errors.image}</span>)}
                            </div>
                        </div>

                        {/* Submit */}
                        <div>
                            <button type="submit"
                                    className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </>)
}

export default LoginRegistrationPage
