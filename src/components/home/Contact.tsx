'use client';

import { Inbox, Location, Phone } from '@/icon';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  message: Yup.string().required('Message is required'),
});

const Contact = () => {
  return (
    <section className=" md:mt-19 mb-0 lg:mb-31  xl:max-h-[531px]">
      <div className="wraper px-5 xl:px-20 flex flex-col-reverse lg:flex-row gap-5 pt-6">
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            message: '',
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm();
          }}
        >
          {(formik) => (
            <Form
              onSubmit={formik.handleSubmit}
              className="w-full xl:w-1/2 -mt-1"
            >
              <label className="text-[14px] font-normal leading-[120%]">
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="w-full border border-contact-border  mb-[14px] p-3 md:p-[17px] rounded focus:outline-none"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red text-sm mb-2"
              />

              <label className="text-[14px] font-normal leading-[120%]">
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                className="w-full border border-contact-border p-3 md:p-[17px] rounded focus:outline-none mb-[14px]"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red text-sm mb-2"
              />

              <label className="text-[14px] font-normal leading-[120%]">
                Phone
              </label>
              <Field
                name="phone"
                type="text"
                className="w-full border border-contact-border p-3 md:p-[17px] rounded focus:outline-none mb-[14px]"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red text-sm mb-2"
              />

              <label className="text-[14px] font-normal leading-[120%]">
                Message
              </label>
              <Field
                as="textarea"
                name="message"
                rows={4}
                className="w-full border border-contact-border p-1 md:p-6.5 rounded focus:outline-none"
              />
              <ErrorMessage
                name="message"
                component="p"
                className="text-btn-bg text-sm mt-2"
              />

              <button
                type="submit"
                className="w-[140px] md:w-[187px] h-[32px] md:h-[49px] flex justify-center items-center 
             bg-btn-bg text-primary-text rounded mt-3 md:mt-2 
             transition-transform duration-300 ease-in-out
             hover:scale-105 hover:shadow-lg hover:brightness-110 "
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-2 md:gap-4 lg:items-start lg:justify-start w-full xl:w-1/2 md:space-y-1.5 mt-5 md:mt-23 xl:ml-1.5">
          <p className=" text-[14px] font-medium text-active-nav underline leading-[100%]">
            Contact Us
          </p>
          <p className="text-[20px] md:text-[32px] font-medium leading-[125%] text-primary-text">
            Have a question? Our team is ready to assist you anytime.
          </p>
          <p className="text-[14px] font-normal leading-[120%] text-primary-text">
            Connect with Farm to learn more about our cattle, dairy products,
            and services. We’re committed to providing quick responses and
            reliable support. Have questions about our farm or products? [Farm
            Name] is just a message away. Contact us for detailed information,
            guidance, or visit arrangements.
          </p>
          <div className="flex flex-col space-y-6 mt-3 md:-mt-1">
            <div className="flex gap-4 items-center">
              <Location />
              <p className="text-[14px] font-normal leading-[120%] text-primary-text">
                Avineu 1200, destiniy
                <br />
                Sidney, Australia
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Phone />
              <p className="text-[14px] font-normal leading-[120%] text-primary-text">
                +1234567890
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Inbox />
              <p className="text-[14px] font-normal leading-[120%] text-primary-text">
                demo123@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
