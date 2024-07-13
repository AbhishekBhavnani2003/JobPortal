import React from "react";
import FormfacadeEmbed from "@formfacade/embed-react";
import Footer from "./Footer";

function Contact() {
  return (
    <>
    <div>
      <FormfacadeEmbed
        formFacadeURL="https://formfacade.com/include/107625562391909637334/form/1FAIpQLSdo6dNJWw2EGUoCPZ7yesynBgchy_U69fQF5VBHAy1BYm2H5Q/classic.js/?div=ff-compose"
        onSubmitForm={() => console.log("Form submitted")}
      />
    </div> 
    <Footer/>
    </>
  );
}

export default Contact;
