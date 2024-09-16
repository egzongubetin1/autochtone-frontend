import AuthLayout from "@/layout/auth/AuthLayout";
import AuthWrapper from "@/layout/auth/AuthLayout";
import ContactForm from "@/layout/contact/ContactForm";
import Navigation from "@/layout/navigation/Navigation";

export default function Contact() {
  return (
    <>
      <Navigation />
      <div className="container py-10 text-center flex flex-col gap-3 font-normal text-[#475467]">
        <h1 className="text-3xl	font-semibold	text-black">Contact Us</h1>
        <p>
          We welcome your feedback, so if you have any suggestions or comments
          please send them to us using the comments box below. 
        </p>
        <p>
          Alternatively, please don't hesitate to call our head office in
          Parsons Green, SW London on +44 (0)207 371 88 66
        </p>
      </div>
      <div className="md:pl-[50px] flex flex-col justify-center gap-5">
        <AuthLayout>
          <div className="flex flex-col gap-5"> 
            <h1 className="text-4xl	font-bold	">Get in touch</h1>
            <p>Our friendly team would love to hear from you.</p>
            <ContactForm />
          </div>
        </AuthLayout>
      </div>
    </>
  );
}
