'use client';

import { createContact } from '@/app/actions/contact.actions';
import { Inbox, Location, Phone } from '@/icon';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


/* ================= VALIDATION ================= */
const ContactSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  message: Yup.string().required('Message is required'),
});

/* ================= TYPES ================= */
interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/* ================= COMPONENT ================= */
const Contact = () => {
  const initialValues: ContactFormValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  return (
    <section className="mt-0 md:mt-10 lg:mt-19 mb-0 lg:mb-31 xl:max-h-[531px]">
      <div className="wraper px-5 md:px-16 xl:px-20 flex flex-col lg:flex-row gap-5 pt-6">
        {/* LEFT FORM */}
        <Formik
          initialValues={initialValues}
          validationSchema={ContactSchema}
          onSubmit={async (values, { resetForm }) => {
            const contactData = {
              id: Date.now(),
              ...values,
              created: new Date()
                .toISOString()
                .split('T')[0],
            };

            await createContact(contactData);

            console.table(contactData);
            resetForm();
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full xl:w-1/2 -mt-2 md:-mt-1"
            >
              {/* NAME */}
              <label className="text-[14px] font-normal leading-[120%]">
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="w-full border border-contact-border mb-[16px] p-[11px] md:p-[17px] rounded focus:outline-none"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-btn-bg text-sm mb-2"
              />

              {/* EMAIL */}
              <label className="text-[14px] font-normal leading-[120%]">
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                className="w-full border border-contact-border p-[12px] md:p-[17px] rounded focus:outline-none mb-[14px]"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-btn-bg text-sm mb-2"
              />

              {/* PHONE */}
              <label className="text-[14px] font-normal leading-[120%]">
                Phone
              </label>
              <Field
                name="phone"
                type="number"
                className="w-full border border-contact-border p-[11px] md:p-[17px] rounded focus:outline-none mb-[14px]"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-btn-bg text-sm mb-2"
              />

              {/* MESSAGE */}
              <label className="text-[14px] font-normal leading-[120%]">
                Message
              </label>
              <Field
                as="textarea"
                name="message"
                rows={4}
                className="w-full border border-contact-border p-2 md:p-6.5 rounded focus:outline-none"
              />
              <ErrorMessage
                name="message"
                component="p"
                className="text-btn-bg text-sm mt-2"
              />

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[140px] md:w-[187px] h-[32px] md:h-[49px]
                  flex justify-center items-center
                  bg-btn-bg text-primary-text rounded mt-3 md:mt-2
                  transition-transform duration-300 ease-in-out
                  hover:scale-105 hover:shadow-lg hover:brightness-110
                  disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </Form>
          )}
        </Formik>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-2 md:gap-4 w-full xl:w-1/2 mt-0 md:mt-10 lg:mt-23 xl:ml-1.5">
          <p className="text-[14px] font-medium text-active-nav underline">
            Contact Us
          </p>

          <p className="text-[20px] md:text-[32px] font-semibold leading-[125%]">
            Have a question? Our team is ready to assist you anytime.
          </p>

          <p className="text-[14px] leading-[120%]">
            Connect with Farm to learn more about our cattle,
            dairy products, and services. We’re committed to
            providing quick responses and reliable support.
          </p>

          <div className="flex flex-col space-y-6 mt-3">
            <div className="flex gap-4 items-center">
              <Location />
              <p className="text-[14px]">
                Avineu 1200, Destiny <br />
                Sidney, Australia
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <Phone />
              <p className="text-[14px]">+1234567890</p>
            </div>

            <div className="flex gap-4 items-center">
              <Inbox />
              <p className="text-[14px]">demo123@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
