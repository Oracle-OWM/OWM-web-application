import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const navigation = [
    { name: 'Login', href: '/login' },
    { name: 'Home Quarantine', href: '/dashboard' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
  <footer className="bg-blue-dark">
    <div className="mx-auto w-11/12 grid  sm:grid-cols-1 md:grid-cols-4 gap-2 py-20">
      <div>
        <h3 className="text-white align-bottom text-2xl font-extrabold">About</h3>
        <p className="text-gray-400 align-bottom text-base">Our beginnings as a manufacturer of water smart meters <br /> in Egypt using AI technology.</p>
      </div>
      <div>
        <h3 className="text-white align-bottom text-xl font-bold">Links</h3>
        <ul className="list text-blue-light text-lg">
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">About Us</Link>
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">FAQs</Link>
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Pricing</Link>
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Login</Link>
        </ul>
      </div>
      <div>
        <h3 className="text-white align-bottom text-xl font-bold">Services</h3>
        <ul className="list text-blue-light text-lg">
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Web Development</Link>
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Mobile Development</Link>
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Machine Learning</Link>
        </ul>
      </div>
      <div>
        <h3 className="text-white align-bottom text-xl font-bold">Contact Us</h3>
          <input type="email" placeholder="Email" className="text-blue-light block px-3 py-2 w-full rounded-md text-lg font-medium" />
      </div>
    </div>
  </footer>
  )
}

export default Footer

