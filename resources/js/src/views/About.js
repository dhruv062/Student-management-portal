import React from "react";

export default function About({ children }) {
  return (
    <div className="max-w-[96rem]  mx-auto mt-16 ">
      <div
        style={{ backgroundImage: "url(/images/cs.jpeg)" }}
        className=" py-16 bg-primary flex flex-col items-center justify-center"
      >
        <h6 className="text-white font-medium">Skillify </h6>

        <h6 className="text-white font-medium">MS CS Program </h6>
      </div>
      <section>
        <h6 className="text-primary mb-4 mt-4 text-center">Overview </h6>
        <div>
          <p className="text-center">
            At our Masters in Computer Science program, we recognize the vital
            role of performance measurement and assessment in optimizing the
            learning journey of our students.
          </p>
        </div>
        <div className=" mb-20">
          <h6 className=" mt-20  text-primary text-center">About the course</h6>
          <div className="px-16">
            <div className="hidden sm:flex items-center justify-center mt-16">
              <div className="max-w-2xl ">
                <img src="/images/about-min.jpg" />
              </div>
            </div>
            <div>
              <ul>
                <li className="mt-8">
                  <span className="font-bold text-xl">
                    Advanced Technical Expertise:{" "}
                  </span>{" "}
                  The MS CS program is designed to provide students with a deep
                  understanding of advanced computer science topics. It covers
                  areas such as algorithms, artificial intelligence, data
                  science, and cybersecurity, ensuring that graduates are
                  technically proficient.
                </li>
                <li className="mt-8">
                  <span className="font-bold text-xl">
                    Research and Innovation:{" "}
                  </span>{" "}
                  We emphasize research as a cornerstone of our program.
                  Students are encouraged to engage in cutting-edge research
                  projects, fostering innovation and the development of new
                  technologies.
                </li>
                <li className="mt-8">
                  <span className="font-bold text-xl">
                    Practical Application:{" "}
                  </span>{" "}
                  Beyond theory, our program emphasizes practical application.
                  Students have access to state-of-the-art labs and are
                  encouraged to work on real-world projects, allowing them to
                  apply their knowledge in practical settings.
                </li>
                <li className="mt-8">
                  <span className="font-bold text-xl">
                    Interdisciplinary Learning:{" "}
                  </span>
                  Computer science is a dynamic field that often intersects with
                  other disciplines. Our program encourages interdisciplinary
                  learning, enabling students to explore how computer science
                  can be applied in various industries and domains.
                </li>
                <li className="mt-8">
                  <span className="font-bold text-xl">
                    Ethical and Social Responsibility:{" "}
                  </span>
                  We believe that with great technical power comes great
                  responsibility. Our program instills a strong sense of ethics
                  and social responsibility, preparing graduates to use their
                  skills for the betterment of society.
                </li>
              </ul>
            </div>
            <div></div>
          </div>
        </div>
        <div className=" mb-20  px-16">
          <h6 className=" mt-20  text-primary text-center">
            Importance of Performance Measurement and Assessment:
          </h6>
          <div className="hidden sm:flex items-center justify-center mt-16">
            <div className="max-w-2xl ">
              <img src="/images/graph-min.jpg" />
            </div>
          </div>
          <ul>
            <li className="mt-8">
              <span className="font-bold text-xl">Student Success: </span>{" "}
              Performance measurement and assessment are essential to ensuring
              student success. They allow us to identify students who may be
              struggling and provide them with the support they need to succeed.
            </li>
            <li className="mt-8">
              <span className="font-bold text-xl">
                Continuous Improvement:{" "}
              </span>{" "}
              Regular assessment allows us to continually improve our program.
              It helps us identify areas where curriculum updates or additional
              resources may be needed to keep pace with the rapidly evolving
              field of computer science.
            </li>
            <li className="mt-8">
              <span className="font-bold text-xl">Personalized Learning: </span>{" "}
              Assessment empowers students to monitor their own progress and
              tailor their academic journey to their specific interests and
              career goals within the field of computer science.
            </li>
            <li className="mt-8">
              <span className="font-bold text-xl">Research Excellence: </span>{" "}
              Through assessment, we can identify students with exceptional
              research potential and provide them with opportunities for
              advanced research projects, contributing to the advancement of
              computer science.
            </li>
            <li className="mt-8">
              <span className="font-bold text-xl">Industry Alignment: </span>{" "}
              Performance measurement ensures that our graduates possess the
              skills and knowledge sought after by industry leaders. This
              alignment enhances their employability and career prospects.
            </li>
            <li className="mt-8">
              <span className="font-bold text-xl">
                Accreditation and Recognition:{" "}
              </span>
              Accrediting bodies and employers alike value rigorous performance
              assessment as an indicator of program quality and student
              competence, helping our graduates stand out in the job market.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
