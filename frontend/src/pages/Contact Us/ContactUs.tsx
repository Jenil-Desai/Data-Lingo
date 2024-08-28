import PageHeader from "../../components/PageHeader";
import ContactForm from "./ContactForm";

export default function ContactUs() {
  return (
    <>
      <PageHeader title={"Contact Us"} description={"We're here to help you. Reach out to us for any inquiries, support, or assistance. Whether you have a question, need help, or just want to say hello, our team is ready to assist you."} />
      <ContactForm />
    </>
  );
}
