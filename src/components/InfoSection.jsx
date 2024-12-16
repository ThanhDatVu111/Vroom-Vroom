import React from "react";

function InfoSection() {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt="A car showroom with a luxury car"
                src="https://i.pinimg.com/564x/48/a4/d5/48a4d503f6639241c6e2c42534a31ad7.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-gray-100">
            <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Welcome to Vroom: Your Gateway to the Perfect Ride
              </h2>

              <p className="mt-4 text-gray-600">
                At Vroom, we simplify your car search by providing a seamless
                platform to explore cars that match your lifestyle. Whether
                you're looking for a sleek sports car, a family SUV, or an
                eco-friendly hybrid, we bring the best options directly to you.
              </p>

              <p className="mt-4 text-gray-600">
                Our services include personalized recommendations, detailed
                vehicle insights, and easy-to-use tools to help you compare,
                decide, and connect with trusted sellers. Drive your dream car
                with confidence, powered by Vroom.
              </p>

              <a
                href="https://www.linkedin.com/in/thanh-dat-vu-42b468286/"
                className="mt-8 inline-block rounded border border-[#6f0320] bg-[#6f0320] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#6f0320] focus:outline-none focus:ring active:text-indigo-500"
              >
                Connect with me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;