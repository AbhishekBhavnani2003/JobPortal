import React from 'react';
const features = [
    {
      iconClass: 'fa-solid fa-bullhorn',
      bgColorClass: 'bg-purple-200',
      title: 'Casting Calls',
      description: 'Post and manage casting calls with ease. Reach out to a wide network of actors, models, and performers.'
    },
    {
      iconClass: 'fa-solid fa-search',
      bgColorClass: 'bg-teal-200',
      title: 'Talent Search',
      description: 'Utilize our advanced search and filter options to find the perfect talent for your project. Browse through detailed profiles and portfolios.'
    },
    {
      iconClass: 'fa-solid fa-user',
      bgColorClass: 'bg-yellow-200',
      title: 'Profile Management',
      description: 'Actors and performers can create and manage their profiles, showcase their portfolios, and apply to casting calls directly through our platform.'
    },
    {
      iconClass: 'fa-solid fa-comments',
      bgColorClass: 'bg-red-200',
      title: 'Communication Tools',
      description: 'Stay connected with your team and talent through our built-in messaging system. Schedule auditions and interviews seamlessly.'
    },
    {
      iconClass: 'fa-solid fa-newspaper',
      bgColorClass: 'bg-green-200',
      title: 'Industry Insights',
      description: 'Stay updated with the latest industry trends, news, and tips from our blog and newsletter.'
    },
    {
      iconClass: 'fa-solid fa-database',
      bgColorClass: 'bg-orange-200',
      title: 'Comprehensive Database',
      description: 'Access a vast database of actors, models, and performers from various backgrounds and skill sets.'
    },
  ];
  

function Services() {
  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

      <section id="new-features" className="py-8 bg-white sm:py-10 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
              Boost Your Productivity
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
              Enhance your workflow with advanced features
            </p>
          </div>
          <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
            {features.map((feature, index) => (
              <div key={index} className="md:p-8 lg:p-14 flex flex-col justify-center items-center">
                <div className={`w-14 h-14 rounded-full ${feature.bgColorClass} flex justify-center items-center`}>
                  <i className={`${feature.iconClass} text-3xl text-gray-900`}></i>
                </div>
                <h3 className="mt-12 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-5 text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
