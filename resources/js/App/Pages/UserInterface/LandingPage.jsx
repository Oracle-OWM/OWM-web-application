import React from 'react'
import Footer from '../../MainComponents/Footer'

const LandingPage = () => {
  return (<>
    <div className='w-full'>
      <main className='w-full'>
        <section className='py-44 bg-gray-100'>
          <div className='w-10/12 mx-auto grid grid-flow-row md:grid-cols-2 grid-cols-1'>
            <div>
              <h1 className='font-extrabold text-3xl text-blue-dark mb-2'>The Oracle Water-Flow Meter (OWM) is here.</h1>
              <h2 className='font-extrabold text-3xl text-blue-dark mb-3'>OWM is the future</h2>
              <p className='text-base text-gray-400 mb-3'>The OWM detects and stops leaks at the source using Artificial Intelligence. It alerts you when water is leaking and automatically shuts it off. Intelligent real-time monitoring identifies sources of leaks and waste, reducing your water consumption and preventing damage.</p>
              <button className='text-lg text-white bg-blue-400 text-center px-5 py-3 rounded'>GET STARTED</button>
            </div>

            <div className='relative'>
              <img className='w-10/12 h-96 z-100' src={`./images/owm-system3.png`} alt=''/>
              <img style={{zIndex: 1}} className='absolute opacity-70 -bottom-44 right-8 w-60 h-60' src={`./images/points2.png`} alt=''/>
            </div>
          </div>
        </section>

        <section className='py-44 bg-gray-100'>
          <div className='w-10/12 mx-auto grid grid-flow-row md:grid-cols-2 grid-cols-1'>
            <div>
              <h3 className='font-extrabold text-3xl text-blue-dark mb-3'>An Overview</h3>
              <p className='text-base text-gray-400 mb-3'>The oracle detects and stops leaks at the source using Artificial Intelligence. It alerts you when water is leaking and automatically shuts it off. Intelligent real-time monitoring identifies sources of leaks and waste, reducing your water consumption and preventing damage.</p>
            </div>

            <div className='relative'>
              <img className='w-10/12 h-96 z-100' src={`./images/owm-system1.png`} alt=''/>
              <img style={{zIndex: 1}} className='absolute opacity-7 -bottom-44 right-8 w-60 h-60' src={`./images/points2.png`} alt=''/>
            </div>
          </div>
        </section>

        <section className="py-44">
          <div className="w-11/12 relative mx-auto">
            <div className="py-8 text-center">
              <h3 className="font-weight-bold text-3xl text-blue-middle" >OWM Features</h3>
            </div>
            <img style={{zIndex: -1}} className='absolute opacity-30 bottom-20 -left-12 w-44 h-44' src="./images/shapes/points3.png" alt="" />
  
            <div className="w-full grid grid-flow-row gap-4 md:grid-cols-3 grid-cols-1">
              <div className="-wrap ">
                <div className="-card">
                  <div className="-image">
                    <img src="./images/mob5.jpg" alt="" />
                  </div>
  
                  <div className="-content">
                    <div className="-info">
                    </div>
                    <h3 className="text-xl font-medium mt-3 mb-4">Mobile Application</h3>
                    <p className="text-base text-gray-400">
                      For easily communication between utility and users.
                    </p>
                    <a href="#" className="text-blue-300 rounded-3xl px-2 py-1 text-base text-center">Read more</a>
                  </div>
                </div>
              </div>
  
              <div className="-wrap">
                <div className="-card">
                  <div className="-image">
                    <img src="./images/web3.jpg" alt="" />
                  </div>
  
                  <div className="-content">
                    <div className="-info">
                    </div>
                    <h3 className="text-xl font-medium mt-3 mb-4">Web-Based Platform</h3>
                    <p className="text-base bg-gray-400">
                      To facilate the connection to the cloud system.
                    </p>
                    <a href="#" className="bg-blue-300 rounded-3xl px-2 py-1 text-base text-center">Read more</a>
                  </div>
                </div>
              </div>
  
              <div className="-wrap">
                <div className="-card">
                  <div className="-image">
                    <img src="./images/Water-Leak.jpeg" alt="" />
                  </div>
  
                  <div className="-content">
                    <div className="-info">
                    </div>
                    <h3 className="text-xl font-medium mt-3 mb-4">Machine Learning</h3>
                    <p className="text-base bg-gray-400">
                      To make leakage predictions based on real statistics.
                    </p>
                    <a href="#" className="bg-blue-300 rounded-3xl px-2 py-1 text-base text-center">Read more</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  </>)
}

export default LandingPage