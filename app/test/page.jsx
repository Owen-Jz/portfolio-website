"use client";

import Image from "next/image";

const testimonials = [
  {
    quote:
      "The e-commerce platform redesign was a game-changer, delivering a modern and seamless shopping experience.",
    name: "Torti Ama-Njoku",
    role: "Founder, ShopTrend",
    picture: "/profiles/torti.png",
    nationality: "/flags/Canada.png",
    rating: 5,
  },
  {
    quote:
      "Owen is a very diverse creative who brings innovation to whatever he does. His personality and approach to problem solving is impeccable. I recommend him for his brilliant and innovative approach.",
    name: "IB Douglas",
    role: "CEO, Probitek",
    picture: "/profiles/ib.png",
    nationality: "/flags/Nigeria.png",
    rating: 5,
  },
  {
    quote:
      "Working with Owen was a breath of fresh air. He communicated well, was upfront, and most importantly, delivered on time. What I perhaps liked most about working with Owen was how he took us through the entire design process. From conception to completion, we had a say in every step — and in the end, this greatly contributed to the perfect product he delivered. I highly recommend him.",
    name: "Mr Moithuti",
    role: "CEO, Moithuti",
    picture: "/profiles/moithuti.png",
    nationality: "/flags/Botswana.png",
    rating: 5,
  },
  {
    quote:
      "Working with Owen was an amazing experience! He was a true team player throughout our brand project bringing creativity, collaboration, and a strong work ethic. His positive attitude and commitment made a real impact. I’d gladly work with him again!",
    name: "Nnene Bright-Victor",
    role: "CEO, NenysTouchs",
    picture: "/profiles/nnene.png",
    nationality: "/flags/Nigeria.png",
    rating: 5,
  },
  {
    quote:
      "Fantastic job on Carb’s brand identity — the visuals are stunning and clearly communicate our vision. Highly recommended!",
    name: "Victor Aghaji",
    role: "CEO, Carb",
    picture: "/profiles/carb.png",
    nationality: "/flags/Nigeria.png",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-500"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md flex flex-col justify-between h-full relative"
              style={{ position: "relative", padding: "0" }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.picture}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name}
                      </span>
                      <Image
                        src={testimonial.nationality}
                        alt="Nationality flag"
                        width={20}
                        height={12}
                        className="ml-2"
                      />
                    </div>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              <span className="text-gray-500 text-[250px] font-bold absolute right-0 top-0 leading-none z-0">
                “
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
