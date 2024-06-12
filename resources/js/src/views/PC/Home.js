import React, { useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { Accordion } from "flowbite-react";
export default () => {
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    axiosInstance
      .post("/api/courses/get_all_courses ")
      .then((response) => {
        // console.log(response.data);
        setCourses(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <React.Fragment>
      <div className=" py-8 bg-primary mb-2 flex flex-col items-center justify-center">
        <h6 className="text-white">
          Hello Coordinator, Welcome to MS CS portal
        </h6>
      </div>
      <div
        style={{ backgroundImage: "url(/images/group.jpeg)" }}
        className=" py-24  flex flex-col items-center justify-center bg-cover"
      ></div>
      <section>
        <h6>MS in Computer Science Program Objectives</h6>
        <ol>
          <li className="my-2">
            <strong>Advanced Knowledge:</strong> Provide students with advanced
            knowledge and expertise in the field of computer science. This
            includes a deep understanding of core concepts, theories, and
            principles.
          </li>
          <li>
            <strong>Research Skills:</strong> Develop students' research skills,
            enabling them to conduct independent research and contribute to the
            body of knowledge in the field. This often involves a thesis or
            research project.
          </li>
          <li>
            <strong>Problem-Solving Abilities:</strong> Equip students with
            strong problem-solving and critical-thinking skills, which are
            essential in the computer science field.
          </li>
          <li>
            <strong>Technical Proficiency:</strong> Provide students with a high
            level of technical proficiency, ensuring they are proficient in
            various programming languages, algorithms, and software development
            practices.
          </li>
          <li>
            <strong>Specialization:</strong> Allow students to specialize in
            specific areas of computer science, such as artificial intelligence,
            data science, cybersecurity, software engineering, or other domains,
            based on their interests and career goals.
          </li>
          <li>
            <strong>Ethical and Professional Responsibility:</strong> Instill a
            sense of ethical and professional responsibility in students,
            emphasizing the importance of ethical behavior and responsible use
            of technology.
          </li>
          <li>
            <strong>Communication Skills:</strong> Develop strong communication
            skills, including the ability to effectively communicate technical
            concepts to both technical and non-technical audiences.
          </li>
          <li>
            <strong>Adaptability:</strong> Prepare students to adapt to the
            rapidly evolving field of computer science and technology. This
            includes staying current with new technologies and trends.
          </li>
          <li>
            <strong>Leadership and Management Skills:</strong> Provide students
            with the skills and knowledge required for leadership and management
            roles in technology organizations.
          </li>
          <li>
            <strong>Preparation for Ph.D. Programs:</strong> For those students
            interested in pursuing a Ph.D. in computer science, the program may
            serve as preparation for advanced doctoral studies.
          </li>
          <li>
            <strong>Employability:</strong> Help students become highly
            employable in a variety of roles, including software developers,
            data scientists, IT managers, and more.
          </li>
          <li>
            <strong>Life-Long Learning:</strong> Encourage and enable students
            to engage in life-long learning, recognizing that the field of
            computer science continually evolves.
          </li>
        </ol>
      </section>

      <div className="px-4">
        <h6 className="underline mt-4">Courses Overview</h6>

        {courses.map((course) => {
          return <CoursesTile key={course.ID} course={course} />;
        })}
      </div>
    </React.Fragment>
  );
};

function CoursesTile({ course }) {
  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>
          <div className="text-2xl font-medium">
            {course.Number}
            {"  "}
            {course.Name}
          </div>
        </Accordion.Title>
        <Accordion.Content>
          <ul>
            <li className="my-4">
              <span className="font-bold text-xl"></span>
            </li>
            <li>
              <span className="font-bold text-md">Course Objectives: </span>
              {course.CourseObjectives}
            </li>
            <li>
              <span className="font-bold text-md">Course Content: </span>
              {course.CourseContent}
            </li>
            <li>
              <span className="font-bold text-md">
                Additional Information:{" "}
              </span>
              {course.AdditionalInformation}
            </li>
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
