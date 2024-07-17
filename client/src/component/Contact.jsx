import React from "react";
import FormfacadeEmbed from "@formfacade/embed-react";
import Footer from "./Footer";
import ContactSidebar from "./ContactSidebar";

function Contact() {
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5">
          <FormfacadeEmbed
            formFacadeURL="https://formfacade.com/include/107625562391909637334/form/1FAIpQLSdo6dNJWw2EGUoCPZ7yesynBgchy_U69fQF5VBHAy1BYm2H5Q/classic.js/?div=ff-compose"
            onSubmitForm={() => console.log("Form submitted")}
          />
        </div>
        <div className="w-full lg:w-2/5">
          <ContactSidebar />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
