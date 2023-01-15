import React, {Fragment, useContext, useEffect, useState,} from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { Disclosure, Menu, Dialog, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon, UserCircleIcon } from '@heroicons/react/outline';
import { AccountsContext } from '../Context/AccountsContext';
import Cookies from 'js-cookie';

const Navbar = () => {
  const {loading, admin} = useContext(AccountsContext);
  const history = useHistory();
  const [navigation, setNavigation] = useState([]);
  useEffect(async() => {
    if(admin && admin.hasOwnProperty('api_token')) {
      await setNavigation([
          { name: 'Home Quarantine', href: '/dashboard' },
          { name: 'Contact Us', href: '/contact-us' },
        ]);
    } else {
      await setNavigation([
          { name: 'FAQs', href: '/' },
          { name: 'Pricing', href: '/' },
          { name: Cookies.get('user') ? 'Logout' : 'Login', href: Cookies.get('user') ? '/Logout' : '/login' },
        ]);
    }
  }, [])
  

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [notifications, setNotifications] = useState(false)

//   const cancelButtonRef = useRef(null)

  return (
  <>
    <Disclosure as="nav" className="backdrop-blur-2xl bg-gray-800 py-3 position-fixed z-50 w-full">
    {({ open }) => (<>
      <div className="w-10/12 mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {open ? (<XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex flex-nowrap items-center">
              {/* <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
              <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"> */}
              <img src={`../../../images/owm-logo.png`} className='w-20 h-20 rounded-full'/>
              <h1 className="text-light text-2xl font-extrabold">Oracle Smart Meter</h1>
            </div>
            
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:block sm:mx-auto">
              <div className="flex space-x-4 ">
                {navigation.map((item, index) => (
                  <NavLink key={index} activeClassName="bg-blue-middle" className="hover:bg-blue-middle bg-transparent text-white px-3 py-2 rounded-2xl text-lg font-medium" to={item.href}>{item.name}</NavLink>
                ))}
              </div>
            </div>  
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item, index) => (
            <NavLink key={index} onClick={(e)=> {if(item.name==='logout') {Cookies.remove('user'); history.replace('/login')}}} activeClassName="bg-black text-white" className="text-blue-thin block hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium" to={item.href}>{item.name}</NavLink>
          ))}
        </div>
      </Disclosure.Panel>
    </>)}
  </Disclosure>

  <Transition.Root show={notifications} as={Fragment}>
    <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setNotifications}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:flex-col sm:items-start">
                <div className="mx-auto flex-shrink-0 flex w-full items-center justify-center  border border-blue-dark rounded-full hover:bg-blue-dark sm:mx-0">
                  <Link className="p-3 btn-outline text-blue-dark text-lg w-full text-center" to="">Show All Notifications</Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Notifications
                  </Dialog.Title>

                  <div className="mt-6 flex flex-col-reverse gap-y-3">
                    <div className="notification-item flex flex-row items-center">
                      <UserCircleIcon className="h-20 w-1/4 text-gray-400 mr-2"/>
                      <div className="w-3/4">
                        <p className="text-gray-600">Omar Abdo Shared</p>
                        <span className="text-blue-300">from a day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  </>
  );
}

export default Navbar
