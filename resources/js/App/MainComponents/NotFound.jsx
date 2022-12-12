import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className= "text-center w-full">
      <h1 className='lg:text-7xl mt-12 mb-4 md:text-5xl sm:text-3xl font-extrabold'>OOPS!</h1>
      <p className='lg:text-3xl md:text-2xl sm:text-xl text-gray-common'>We Can't find the page you are looking for</p>
      <img src={`../../../../../images/404.png`} className=' h-96 w-6/12 mx-auto my-10' alt='404 Error'/>
      <Link to={`/managementSystem/users/all`} className='bg-blue-900 hover:text-gray-800 py-3 w-2/5 rounded text-white inline-block'>Back to Main</Link>
    </section>
  )
}

export default NotFound;
