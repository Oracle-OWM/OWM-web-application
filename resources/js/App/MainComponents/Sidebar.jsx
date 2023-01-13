import React, { useContext,useState } from 'react'
import { UserCircleIcon, LogoutIcon, XCircleIcon, MenuIcon, BellIcon } from '@heroicons/react/outline';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../Context/AdminContext';
import { isEmpty } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { CogIcon, LibraryIcon, PlusCircleIcon, TableIcon, UserAddIcon } from '@heroicons/react/solid';
import Cookies from 'js-cookie';

function Sidebar() {
  const { loading, logout, } = useContext(AdminContext);
  const admin = Cookies.get('admin') && JSON.parse(Cookies.get('admin'));


  const isStatic = useMediaQuery({
    query: '(min-width: 764px)'
  });

  const menus = [
    {
      btn:'Dashboard',
      items: [
        {
          label:'all IoT Devices',
          url:`/dashboard/IoTDevices/all`,
        },
      ]
    },
    {
      btn:'IoTDevices',
      items: [
        {
          label:'all IoT Devices',
          url:`/managementSystem/IoTDevices/all`,
        },
        {
          label:'add IoT Device',
          url:`/managementSystem/IoTDevices/addIoTDevice`,
        },
      ]
    },
    {
      btn:'users',
      items: [
        {
          label:'All users',
          url:`/managementSystem/users/all`,
        },
        {
          label:'Add user',
          url:`/managementSystem/users/addUser`,
        },
      ]
    },
    {
      btn:'admins',
      items: [
        {
          label:'All admins',
          url:`/managementSystem/accounts/all`,
        },
        {
          label:'Add admin',
          url:`/managementSystem/accounts/addAccount`,
        },
      ]
    },
  ];

  return (<>
    {!isEmpty(admin) && (
      <Disclosure>
        {(() => {
          let [close, setClose] = useState(false);

          return (<>
            <Disclosure.Button className="text-red-common absolute top-20 right-5 z-50">
              {!isStatic ? close ? (<XCircleIcon onClick={()=>{setClose(!close); console.log(close)}} className="h-8 w-8 float-right mt-3" />)
                : (<MenuIcon onClick={()=>{setClose(!close); console.log(close)}} className="h-8 w-8 float-right mt-3" />) : null}
            </Disclosure.Button>
            <div className={`${close ? 'z-40' : 'z-0'} min-h-screen absolute md:relative col-md-3 col-sm-12 flex flex-col ${close || isStatic ? ' bg-white' : 'bg-gray-light'}`}>
              <Transition
                show={close || isStatic}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className={''}  static>
                  <aside className={`  `}>
                    <h1 className='md:text-4xl sm:text-2xl text-xl text-blue-300 text-center mt-12 mb-4 font-extrabold'>OWM</h1>
                    <div className="text-center">
                      {admin.image ? (
                        <img src={`../../../../${admin.image}`} className="h-20 w-1/4 mx-auto rounded-full block" alt="admin" />
                      )
                        : (<><UserCircleIcon className="h-20 w-1/4 mx-auto text-gray-400" /></>)}
                      <h2 className="mb-3 mt-2 md:text-xl sm:lg text-base text-blue-middle">{admin.full_name}</h2>
                      <hr className="w-2/3 mb-4 mx-auto"></hr>
                    </div>

                    <div className={`${close ? 'h-0' : 'min-h-screen'}`}>
                      {menus.map((menu, index)=>(
                        <Menu key={index}>
                          <Menu.Button className='d-block capitalize w-full bg-gray-100 hover:bg-gray-200 p-3 mt-2 text-left capitalized'>{menu.btn}</Menu.Button>
                          <Menu.Items className={`bg-gray-light`}>
                            {menu.items.map((item, index2)=>(
                              <Menu.Item key={index2}>
                                {({ active }) => (
                                  <a
                                    className={`d-block w-full p-2 text-blue-dark ${active && 'bg-blue-dark text-light'}`}
                                    href={item.url}
                                  >
                                    {item.label}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Menu>
                      ))}

                      <button onClick={(e) => { logout(); e.target.style = `cursor: wait`; }} type="button" className="relative bg-blue-100 w-full hover:bg-blue-200 text-blue-middle rounded p-3 my-5 md:text-base sm:text-sm text-xs">
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LogoutIcon className="h-5 w-5 group:hover:text-indigo-700" />
                        </span>
                        Logout
                      </button>
                    </div>
                  </aside>
                </Disclosure.Panel>
              </Transition>
            </div>
          </>)
        })}
      </Disclosure>
    )}
  </>)
}

export default Sidebar;
