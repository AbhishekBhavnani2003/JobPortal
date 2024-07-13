import React from 'react'

function About() {
  return (
    <div> 
        <div className="sm:flex items-center max-w-screen-xl">
    <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" / >
        </div>
    </div>
    <div className="sm:w-1/2 p-5">
        <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-indigo-600"> Jobpilot</span>
            </h2>
            <p className="text-gray-700" style={{textAlign:'justify', marginRight:'10px'}}>
            At Jobpilot, we understand the nuances and demands of the casting industry. Our platform is designed by industry professionals for industry professionals. With a user-friendly interface and advanced search functionalities, we ensure that you can find the perfect match for your project swiftly and efficiently. Our mission is to provide a comprehensive, all-in-one platform that caters to the diverse needs of casting professionals.
            </p>
        </div>
    </div>
</div>
    </div>
  )
}

export default About