import React from 'react'
import Footer from '../../MainComponents/Footer'
import { MapPin } from '@heroicons/react/solid';
import Navbar from '../../MainComponents/Navbar';

const LandingPage = () => {
  return (<>
    <div className='w-full'>
      <Navbar />
      <main className='w-full'>
        {/* About */}
        <section className=' pt-64 bg-gray-100'>
          <div className='w-10/12 mx-auto grid justify-between items-center grid-flow-row md:grid-cols-2 grid-cols-1'>
            <div className=''>
              <h1 className='font-extrabold text-3xl text-blue-dark mb-2'>The Oracle Water-Flow Meter (OWM) is here.</h1>
              <h2 className='font-extrabold text-3xl text-blue-dark mb-3'>OWM is the future</h2>
              <p className='text-base text-gray-400 mb-3'>The OWM detects and stops leaks at the source using Artificial Intelligence. It alerts you when water is leaking and automatically shuts it off. Intelligent real-time monitoring identifies sources of leaks and waste, reducing your water consumption and preventing damage.</p>
              <button className='text-lg text-white bg-blue-400 text-center px-5 py-3 rounded'>GET STARTED</button>
            </div>

            <div className=' relative'>
              <img className='w-10/12 ml-auto h-96 z-100' src={`./images/owm-system3.png`} alt=''/>
              <img style={{zIndex: 1}} className='absolute opacity-70 -bottom-32 -right-24 w-44 h-44' src={`./images/points2.png`} alt=''/>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className=' pt-64 pb-64 bg-gray-100'>
          <div className='w-10/12 mx-auto grid items-center grid-flow-row md:grid-cols-2 grid-cols-1'>
            <div className=''>
              <h3 className='font-extrabold text-3xl text-blue-dark mb-3'>An Overview</h3>
              <p className='text-base text-gray-400 mb-3'>The oracle detects and stops leaks at the source using Artificial Intelligence. It alerts you when water is leaking and automatically shuts it off. Intelligent real-time monitoring identifies sources of leaks and waste, reducing your water consumption and preventing damage.</p>
            </div>

            <div className=' relative'>
              <img className='w-10/12 ml-auto h-96 z-100' src={`./images/owm-system1.png`} alt=''/>
              <img style={{zIndex: 1}} className='absolute opacity-7 -bottom-32 -right-24 w-44 h-44' src={`./images/points2.png`} alt=''/>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-44">
          <div className="w-11/12 relative mx-auto">
            <div className="py-8 text-center">
              <h3 className="font-weight-bold text-3xl text-blue-middle" >OWM Features</h3>
            </div>
            <img style={{zIndex: -1}} className='absolute opacity-30 -bottom-20 -left-12 w-44 h-44' src="./images/shapes/points3.png" alt="" />
  
            <div className="w-full grid grid-flow-row gap-4 md:grid-cols-3 grid-cols-1">
              <div className="-wrap bg-white pb-5 ">
                <div className="-card">
                  <div className="-image h-96">
                    <img className='w-full h-full' src="./images/mob5.jpg" alt="" />
                  </div>
  
                  <div className="-content ml-3">
                    <div className="-info">
                    </div>
                    <h3 className="text-xl font-medium my-3">Mobile Application</h3>
                    <p className="text-base mb-3 text-gray-400">
                      For easily communication between utility and users.
                    </p>
                    <a href="#" className="bg-blue-300 rounded-3xl px-4 py-2 text-white text-base text-center">Read more</a>
                  </div>
                </div>
              </div>
  
              <div className="-wrap bg-white pb-5">
                <div className="-card">
                  <div className="-image h-96">
                    <img className='w-full h-full' src="./images/web3.jpg" alt="" />
                  </div>
  
                  <div className="-content ml-3">
                    <div className="-info">
                    </div>
                    <h3 className="text-xl font-medium my-3">Web-Based Platform</h3>
                    <p className="text-base mb-3 text-gray-400">
                      To facilate the connection to the cloud system.
                    </p>
                    <a href="#" className="bg-blue-300 rounded-3xl px-4 py-2 text-white text-base text-center">Read more</a>
                  </div>
                </div>
              </div>
  
              <div className="-wrap bg-white pb-5">
                <div className="-card">
                  <div className="-image h-96">
                    <img className=' h-full' src="./images/Water-Leak.jpeg" alt="" />
                  </div>
  
                  <div className="-content ml-3">
                    <div className="-info">
                    </div>
                    <h3 className="text-xl font-medium my-3">Machine Learning</h3>
                    <p className="text-base mb-3 text-gray-400">
                      To make leakage predictions based on real statistics.
                    </p>
                    <a href="#" className="bg-blue-300 rounded-3xl px-4 py-2 text-white text-base text-center">Read more</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Records  */}
        <section className="records bg-blue-400">
          {/* <div className="overlay overlay-sm">
            <img src="./img/shapes/square.png" alt="" className="shape square1" />
            <img src="./img/shapes/square.png" alt="" className="shape square2" />
            <img src="./img/shapes/circle.png" alt="" className="shape circle" />
            <img src="./img/shapes/half-circle.png" alt="" className="shape half-circle" />
            <img src="./img/shapes/wave.png" alt="" className="shape wave wave1" />
            <img src="./img/shapes/wave.png" alt="" className="shape wave wave2" />
            <img src="./img/shapes/x.png" alt="" className="shape xshape" />
            <img src="./img/shapes/triangle.png" alt="" className="shape triangle" />
          </div> */}
  
          <div className="w-11/12 mx-auto py-12 grid grid-flow-row gap-x-5 gap-y-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            <div className="wrap mx-auto">
              <div className="w-44 h-44 text-white text-center record-circle rounded-full p-3 border-2 border-white">
                <h2 className="number mt-10" data-num="25000">25000</h2>
                <h4 className="text-base mb-5">Leakages Detected</h4>
              </div>
            </div>
  
            <div className="wrap mx-auto">
              <div className="w-44 h-44 text-white text-center record-circle rounded-full p-3 border-2 border-white active">
                <h2 className="number mt-10" data-num="374">374</h2>
                <h4 className="text-base mb-5">Happy Clients</h4>
              </div>
            </div>
  
            <div className="wrap mx-auto">
              <div className="w-44 h-44 text-white text-center record-circle rounded-full p-3 border-2 border-white">
                <h2 className="number mt-10" data-num="350000">350000</h2>
                <h4 className="text-base mb-5">Wires &amp; Tubes capability</h4>
              </div>
            </div>
  
            <div className="wrap mx-auto">
              <div className="w-44 h-44 text-white text-center record-circle rounded-full p-3 border-2 border-white">
                <h2 className="number mt-10" data-num="23">23</h2>
                <h4 className="text-base mb-5">Awards</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Get In Touch */}
        <section style={{backgroundImage:"url('./images/map.png')"}} className="contact py-56" id="contact">
          <div className="">
            <div className="contact-box lg:w-8/12 md:w-11/12 bg-white py-20 lg:px-24 md:px-12 rounded-3xl mx-auto py-38 grid grid-flow-row grid-cols-2">
              <div className="contact-info">
                <h3 className="title font-extrabold mb-4 text-3xl relative">Get in touch<div className='h-2 w-1/5 mt-1 mr-auto rounded-lg bg-blue-400'></div></h3>
                
                <div className="information-wrap">
                  <div className="information flex flex-row flex-wrap gap2 items-center  mb-3">
                    <div className="contact-icon relative bg-blue-400 w-14 h-14 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 my-2.5 mx-auto text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p className="info-text ml-2 text-lg text-gray-400 text-wrap">OWM Headquarters, 5th <br/> Settlement, Egypt</p>
                  </div>

                  <div className="information flex flex-row flex-wrap gap2 items-center  mb-3">
                    <div className="contact-icon relative bg-blue-400 w-14 h-14 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 my-2.5 mx-auto text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p className="info-text ml-2 text-lg text-gray-400 text-wrap">owm@gmail.com</p>
                  </div>

                  <div className="information flex flex-row flex-wrap gap2 items-center  mb-3">
                    <div className="contact-icon relative bg-blue-400 w-14 h-14 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 my-2.5 mx-auto text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    </div>
                    <p className="info-text ml-2 text-lg text-gray-400 text-wrap">(+20) 1150462982</p>
                  </div>
  
                </div>
              </div>
  
              <form className="contact-form">
                <h3 className="title font-extrabold mb-4 text-3xl">Contact Us</h3>
                <div className="grid grid-flow-row grid-cols-2 w-full">
                  <input type="text" className="contact-input my-2 mr-2.5 text-base text-gray-500 px-3 py-2.5 bg-gray-300 rounded-3xl" placeholder="First Name" />
                  <input type="text" className="contact-input my-2 ml-2.5 text-base text-gray-500 px-3 py-2.5 bg-gray-300 rounded-3xl" placeholder="Last Name" />
                </div>
  
                <div className="grid grid-flow-row grid-cols-2 g-2 w-full">
                  <input type="text" className="contact-input my-2 mr-2.5 text-base text-gray-500 px-3 py-2.5 bg-gray-300 rounded-3xl" placeholder="Phone" />
                  <input type="email" className="contact-input my-2 ml-2.5 text-base text-gray-500 px-3 py-2.5 bg-gray-300 rounded-3xl" placeholder="Emai2" />
                </div>
  
                <div className="grid grid-flow-row grid-cols-1 gap-2 w-full">
                  <textarea name="message" placeholder='Message' className="w-full h-44 contact-input my-2 text-base text-gray-500 px-3 py-2.5 bg-gray-300 rounded-3xl" placehol2er="Message"></textarea>
                </div>
                <a href="#" className="bg-blue-400 w-1/3 text-lg text-white rounded-3xl px-3 py-2 mt-2 text-center block mr-auto">Send</a>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  </>)
}

export default LandingPage