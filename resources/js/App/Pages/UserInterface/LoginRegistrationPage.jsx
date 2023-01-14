import React from 'react'
import { UserContext } from '../../Context/UserContext';
import Navbar from '../../MainComponents/Navbar';

const LoginRegistrationPage = () => {
    const { loading, errors, errorNum, setInput, inputsState, resetAllInputs, resetAllErrors, login } = useContext(UserContext);

    useEffect(async() => {
      await resetAllInputs();
      await resetAllErrors();
    }, []);

    async function loginHandler(e) {
        e.preventDefault();
        await login(inputsState);
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
            <div id="alert" className="bg-blue-300 mt-2 w-4/5 mx-auto border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                        <p className="font-bold">Registration Failed</p>
                        <p className="text-sm">Please check the data you entered</p>
                    </div>
                </div>
            </div>
        )}
            
        <main className="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
            <div className="container px-5 py-24 mx-auto">

                <div className="w-full mx-auto flex flex-wrap md:flex-row flex-col justify-center items-start">
                    <form  method="POST"  action={(e)=>loginHandler(e)} className="mx-auto  my-8 w-8/12 md:w-4/12" encType="multipart/form-data">
                        <h3 style="line-height: 1.2" className="lg:text-start lg:w-auto w-full text-center font-semibold text-5xl text-blue-800">إنشاء حساب جديد</h3>

                        {/* identifier */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                            <label htmlFor="identifier" className="capitalize md:text-lg text-xs">
                                {content.admin_login_form_identifier} :
                            </label>
                            <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.identifier : ''} id={`identifier`} name="identifier" type="text" placeholder="Enter Your Email Address"
                                className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            {errors && (<span className="text-red-common p-3">{errors.identifier}</span>)}
                            </div>
                        </div>

                        {/* password */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                            <label htmlFor="password" className="capitalize md:text-lg text-xs">
                                {content.admin_login_form_password} :
                            </label>
                            <input onChange={(e)=>setInput(e)} value={inputsState ? inputsState.password : ''} id={`password`} name="password" type="password" placeholder="Enter Your Password"
                                className="bg-blue-thin relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            {errors && (<span className="text-red-common p-3">{errors.password}</span>)}
                            </div>
                        </div>

                        {/* submit */}
                        <div>
                            <button
                            type="submit"
                            className="group bg-blue-600 relative w-full flex justify-center py-3 px-4 text-xl text-white font-medium rounded-md border-blue-dark border-2 hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 group:hover:text-indigo-700" aria-hidden="true" />
                            </span>
                            {content.admin_login_form_submit}
                            </button>
                        </div>
                    </form>

                    <span style="border-radius: 50%;" className="bg-blue-900 opacity-60 text-white d-inline-block border-1 p-10 text-center mt-32">أو</span>

                    <form  method="POST" action="{{route('login')}}" className="mx-auto  my-8 w-8/12 md:w-4/12" encType="multipart/form-data">
                        <h3 style="line-height: 1.2" className="lg:text-start lg:w-auto w-full text-center font-semibold text-5xl text-blue-800">تسجيل دخول</h3>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                                <label for="identifier" className="capitalize md:text-lg text-xs">
                                    Email Address <span className='text-red-600'>*</span>:
                                </label>
                                
                            </div>
                        </div>

                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mt-4">
                                <label for="password" className="capitalize md:text-lg text-xs">
                                    Password <span className='text-red-600'>*</span>:
                                </label>

                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </>)
}

export default LoginRegistrationPage