import React from 'react'

function Testimonials() { 
   
  const testimonials = [
    {
      quote: "Casting Connect has revolutionized our casting process. The platform is easy to use and has connected us with incredible talent. We've streamlined our workflow and found actors who perfectly fit our projects. It's truly a game-changer for our production team.",
      name: "Jane Doe",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    },
    {
      quote: "As an actor, I appreciate how straightforward it is to create a profile and apply for roles. Casting Connect has opened up so many opportunities for me. The seamless application process and the range of roles available have significantly boosted my career.",
      name: "Sarah Johnson", 
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      quote: "The comprehensive database and advanced search options have made finding the right talent so much easier. Highly recommend Casting Connect. It's an invaluable resource for casting directors and has improved our efficiency in sourcing top-notch talent for various projects.",
      name: "John Smith", 
      image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];
      
    
  return (
    <section id="testimonials" aria-label="What our customers are saying" className="bg-slate-50 py-20 sm:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl md:text-center">
        <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">What Our Customers Are Saying</h2>
      </div>
      <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <li key={index}>
            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              <li>
                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  <svg aria-hidden="true" width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
                    <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path>
                  </svg>
                  <blockquote className="relative">
                    <p className="text-lg tracking-tight text-slate-900">{testimonial.quote}</p>
                  </blockquote>
                  <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                    <div>
                      <div className="font-display text-base text-slate-900">{testimonial.name}</div>
                    </div>
                    <div className="overflow-hidden rounded-full bg-slate-50">
                      <img alt="" className="h-14 w-14 object-cover" src={testimonial.image} />
                    </div>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </section>
  )
}

export default Testimonials