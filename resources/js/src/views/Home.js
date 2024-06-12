import React from "react";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { useRef } from "react";
export default function Home({ children }) {
  const scrollRef = useRef(null);

  return (
    <div className="max-w-[96rem]  mx-auto mt-16 ">
      <div
        style={{ backgroundImage: "url(/images/lady-min.jpg)" }}
        className="backdrop-blur-md h-[360px] md:h-[480px] lg:h-[696px]  bg-center bg-cover bg-origin-padding	flex items-center justify-center p-4"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-white bg-black p-4 bg-opacity-75 translate-y-7 rounded-md"
        >
          Welcome to Skillify{" "}
        </motion.h1>
      </div>
      <div>
        <section>
          <motion.div className="bg-primary text-white flex-col items-center  md:px-32 lg:px-60 px-16  py-16 ">
            <h2 className="text-white  text-center">
              {" "}
              Lets make world better place{" "}
            </h2>

            <h6 className="text-white text-base font-normal text-center pt-4">
              At our Masters in Computer Science program, we recognize the vital
              role of performance measurement and assessment in optimizing the
              learning journey of our students. Our program is designed to
              provide students with a holistic learning experience that prepares
              them for success in the field of computer science. We are
              committed to excellence in education, and our program is designed
              to provide students with a rigorous curriculum that equips them
              with the knowledge and skills necessary to excel in the field of
              computer science.
            </h6>
            <div className="hidden sm:flex items-center justify-center mt-16">
              <div className="max-w-2xl ">
                <img src="/images/pexels-kampus-production-5940721-min.jpg" />
              </div>
            </div>
          </motion.div>
        </section>
        <section>
          <div>
            <h6 className="font-medium text-center pt-16"> What We offer</h6>
          </div>
        </section>

        <section className="pb-32 pt-16">
          <div className=" block lg:flex justify-around">
            <div className="flex-1">
              <img src="/images/sde.jpeg" />
            </div>

            <div className="flex-1  bg-white border border-gray-200 shadow ">
              <div className="px-24 pt-12">
                <h6 className="text-6xl">"</h6>
                <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
                  Performance Measurement and Assessment
                </h5>
                <h5 className="mb-2 text-2xl font-normal  tracking-tight text-gray-900 dark:text-white">
                  Excellence in Education
                </h5>
                <h5 className="mb-2 text-2xl font-normal  tracking-tight text-gray-900 dark:text-white">
                  Cutting-Edge Research
                </h5>
                <h5 className="mb-2 text-2xl font-normal  tracking-tight text-gray-900 dark:text-white">
                  Industry Relevance
                </h5>
                <h5 className="mb-2 text-2xl font-normal  tracking-tight text-gray-900 dark:text-white">
                  Holistic Development
                </h5>
                <h6 className="text-6xl text-end">"</h6>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
