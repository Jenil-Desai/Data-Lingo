import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

export function ContactForm() {
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography variant="h5" color="blue-gray" className="mb-4 !text-base lg:!text-2xl" placeholder={undefined}>
          Customer Care
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-4 !text-3xl lg:!text-5xl" placeholder={undefined}>
          We&apos;re Here to Help
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500" placeholder={undefined}>
          Whether it&apos;s a question about our services, a request for technical assistance, or suggestions for improvement, our team is eager to hear from you.
        </Typography>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
          {/* <img src="/image/map.svg" alt="map" className="w-full h-full lg:max-h-[510px]" /> */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8846040908475!2d70.76521217529196!3d22.282360679699483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cbbfcdeb3e33%3A0x11a782bf6775a71d!2sAtmiya%20University!5e0!3m2!1sen!2sin!4v1724074503377!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full lg:max-h-[510px] rounded-md transform transition-transform duration-300 hover:scale-105"></iframe>
          <form action="#" className="flex flex-col gap-4 lg:max-w-sm">
            <Typography variant="small" className="text-left !font-semibold !text-gray-600" placeholder={undefined}>
              Select Options for Business Engagement
            </Typography>
            <div className="flex gap-4">
              <Button variant="outlined" className="max-w-fit" placeholder={undefined}>
                General Inquiry
              </Button>
              <Button variant="outlined" className="max-w-fit" placeholder={undefined}>
                Product Support
              </Button>
              <Button variant="outlined" className="max-w-fit" placeholder={undefined}>
                Sales Inquiry
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined}>
                  First Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="first-name"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                />
              </div>
              <div>
                <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined}>
                  Last Name
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Last Name"
                  name="last-name"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin={undefined}
                />
              </div>
            </div>
            <div>
              <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined}>
                Your Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="name@email.com"
                name="email"
                className="focus:border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
                crossOrigin={undefined}
              />
            </div>
            <div>
              <Typography variant="small" className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined}>
                Your Message
              </Typography>
              <Textarea
                rows={6}
                color="gray"
                placeholder="Message"
                name="message"
                className="focus:border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button className="w-full" color="gray" placeholder={undefined}>
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
