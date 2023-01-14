import React from 'react'
import Navbar from '../../MainComponents/Navbar';

const LoginRegistrationPage = () => {
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
                <form  method="POST" action="{{route('register')}}" className="mx-auto  my-8 w-8/12 md:w-4/12" encType="multipart/form-data">
                    <h3 style="line-height: 1.2" className="lg:text-start lg:w-auto w-full text-center font-semibold text-5xl text-blue-800">إنشاء حساب جديد</h3>

                    @csrf

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                            <label for="full_name" className="capitalize md:text-lg text-xs">
                                Full Name <span className='text-red-600'>*</span>:
                            </label>
                            <input value="{{old('full_name')}}" id="full_name" name="full_name" type="text" placeholder="Enter The Full Name"
                                     className="@error('full_name') is-invalid @enderror bg-white relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            @error('full_name')
                                <div className="alert alert-danger text-red-common p-3">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                            <label for="username" className="capitalize md:text-lg text-xs">
                                Username <span className='text-red-600'>*</span>:
                            </label>
                            <input value="{{old('username')}}" id="username" name="username" type="text" placeholder="Enter username"
                                      className="@error('username') is-invalid @enderror bg-white relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            @error('username')
                                <div className="alert alert-danger text-red-common p-3">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                            <label for="email" className="capitalize md:text-lg text-xs">
                                Email Address <span className='text-red-600'>*</span>:
                            </label>
                            <input value="{{old('email')}}" id="email" name="email" type="email" placeholder="Enter Email Address"
                                    className="@error('email') is-invalid @enderror bg-white relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            @error('email')
                                <div className="alert alert-danger text-red-common p-3">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                            <label for="password" className="capitalize md:text-lg text-xs">
                                Password <span className='text-red-600'>*</span>:
                            </label>
                            <input id="password" name="password" type="password" placeholder="Password must be 8 charachters at least"
                                    className="@error('password') is-invalid @enderror bg-white relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            @error('password')
                                <div className="alert alert-danger text-red-common p-3">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                            <label for="phone" className="capitalize md:text-lg text-xs">
                                Phone Number <span className='text-red-600'>*</span>:
                            </label>
                            <input value="{{old('phone')}}" id="phone" name="phone" type="phone" placeholder="Enter Your Phone Number"
                                    className="@error('phone') is-invalid @enderror bg-white relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            @error('phone')
                                <div className="alert alert-danger text-red-common p-3">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                            <label for="address" className="capitalize md:text-lg text-xs">
                                address:
                            </label>
                            <input value="{{old('address')}}" id="address" name="address" type="text" placeholder="Enter The User Address"
                                     className="@error('address') is-invalid @enderror bg-white relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            @error('address')
                                <div className="alert alert-danger text-red-common p-3">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                            <label for="national_ID" className="capitalize md:text-lg text-xs">
                                Nationa ID <span className='text-red-600'>*</span>:
                            </label>
                            <input value="{{old('national_ID')}}" id="national_ID" name="national_ID" type="number" placeholder="Enter Your National ID"
                                     className="@error('national_ID') is-invalid @enderror bg-white relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            @error('national_ID')
                                <div className="alert alert-danger text-red-common p-3">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-4">
                            <label for="image" className="capitalize md:text-lg text-xs">
                                Upload Your Image :
                            </label>
                            <input id="image" name="image" type="file" placeholder="Upload Image"
                                   className="@error('image') is-invalid @enderror bg-white relative block w-full p-3 border md:text-lg text-xs placeholder-gray-common text-blue-dark rounded-t-md rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                            />
                            @error('image')
                            <div className="alert alert-danger text-red-common p-3">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                className="group btn-outline relative w-full flex justify-center py-3 px-4 md:text-xl text-xs text-blue-dark font-medium rounded-md border-blue-dark border-2 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            إنشاء حساب جديد
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