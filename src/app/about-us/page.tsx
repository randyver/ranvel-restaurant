import { AppleCardsCarouselDemo } from "@/components/carousel-about-us";
import Image from "next/image";
import { type Metadata } from "next";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About Us | Ranvel Restaurant",
  openGraph: {
    ...openGraphTemplate,
    title: "About Us | Ranvel Restaurant",
  },
  twitter: {
    ...twitterTemplate,
    title: "About Us | Ranvel Restaurant",
  },
};

export default function AboutUsPage() {
  return (
    <div className="p-6 lg:p-12">
      <h1 className="text-3xl font-bold text-center mb-10 xl:text-4xl">
        About <span className="text-orange-600">Us</span>
      </h1>
      <p className="mt-6 xl:text-lg leading-relaxed text-center mx-auto">
        Indulge in a culinary journey where every dish is crafted with passion
        and precision, using the finest ingredients to bring you an
        unforgettable dining experience. Whether you're here for a quick bite
        or a lavish feast, our warm and inviting atmosphere, combined with our
        dedication to exceptional service, ensures that every visit is a
        delightful escape from the ordinary. At Ranvel Restaurant, we don't
        just serve food; we create memories that linger long after the last
        bite.
      </p>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold xl:text-3xl text-center">
          The <span className="text-orange-600">Passion</span> Behind Ranvel
          Restaurant
        </h2>
        <AppleCardsCarouselDemo />
      </div>
      <div className="md:flex md:justify-between md:mt-16 mt-12">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h2 className="text-2xl font-semibold xl:text-3xl text-center md:text-left">
            <span className="text-orange-600">Our</span> Address
          </h2>
          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.0136070512433!2d106.8272134!3d-6.365585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed14f2f3a4c7%3A0xa00e0c3e75cde84!2sUniversitas%20Indonesia!5e0!3m2!1sen!2sid!4v1614706721823!5m2!1sen!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center md:items-end">
          <h2 className="text-2xl font-semibold xl:text-3xl">
            Contact <span className="text-orange-600">Us</span>
          </h2>
          <div className="flex gap-x-6 mt-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagram-icon.png"
                alt="Instagram"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/twitter-icon.png"
                alt="Twitter"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/whatsapp-icon.png"
                alt="WhatsApp"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
            <a
              href="https://www.gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/email-icon.png"
                alt="Email"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold xl:text-3xl text-center">
          <span className="text-orange-600">Our</span> Partnership
        </h2>
        <div className="mt-8">
          <Image
            src="/logo-mochi.png"
            alt="Partner Logo"
            width={500}
            height={500}
            className="mx-auto"
          />
          <p className="mt-6 xl:text-lg leading-relaxed text-center mx-auto">
            Indulge in the delightful flavors of Mochi with our exclusive
            pre-order offer! Savor the sweetness of Daifuku Mochi filled with
            fresh strawberries, creamy Mochi Cream with a variety of flavors,
            and the unique taste of Dango Mochi. Don't miss out on our
            delectable Mochi Bites, available in a convenient box for easy
            enjoyment. Available for pre-order in East Jakarta, treat yourself
            or your loved ones to these irresistible treats. For more
            information and to place your order, follow us on Instagram{" "}
            <a
              href="https://www.instagram.com/moochiveliciousss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              @mochivelicious
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
