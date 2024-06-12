import React from "react";

export default function Services() {
  return (
    <div className="max-w-[96rem]  mx-auto mt-16 ">
      <div
        style={{ backgroundImage: "url(/images/cs.jpeg)" }}
        className=" py-16 bg-primary flex flex-col items-center justify-center"
      >
        <h6 className="text-white font-medium">Skillify </h6>

        <h6 className="text-white font-medium">MS CS Program </h6>
      </div>
      <section className="md:px-32 px-8 py-16">
        <h6 className=" mt-20  text-primary text-center">
          List of Courses Within the MS CS Program:
        </h6>
        <div className="hidden sm:flex items-center justify-center mt-16">
          <div className="max-w-2xl ">
            <img src="/images/list-min.jpg" />
          </div>
        </div>
        <p>
          Here's a sample list of courses typically offered in an MS CS program:
        </p>
        <ul>
          <li className="my-4">
            <span className="font-bold text-xl">
              Algorithms and Data Structures
            </span>
          </li>
          <li>
            <span className="font-bold text-md">Course Objectives:</span>This
            course aims to provide students with a strong foundation in
            algorithms and data structures, enabling them to design efficient
            algorithms and analyze their complexity.
          </li>
          <li>
            <span className="font-bold text-md">Course Content:</span>Topics
            include sorting algorithms, graph algorithms, data structures like
            trees and heaps, and algorithmic problem-solving.
          </li>
          <li>
            <span className="font-bold text-md">Additional Information:</span>
            Prerequisite - Bachelor's-level data structures and programming.
          </li>
        </ul>
        <ul>
          <li className="my-4">
            <span className="font-bold text-xl">Machine Learning</span>
          </li>
          <li>
            <span className="font-bold text-md">Course Objectives:</span>Explore
            machine learning techniques, understand their theoretical
            foundations, and apply them to real-world problems.
          </li>
          <li>
            <span className="font-bold text-md">Course Content:</span>Topics
            include supervised and unsupervised learning, deep learning, and
            practical machine learning applications.
          </li>
          <li>
            <span className="font-bold text-md">Additional Information:</span>
            Prerequisites - Linear algebra, statistics, and programming skills.
          </li>
        </ul>
        <ul>
          <li className="my-4">
            <span className="font-bold text-xl">Software Engineering</span>
          </li>
          <li>
            <span className="font-bold text-md">Course Objectives:</span>Develop
            skills in software design, architecture, and project management,
            with a focus on producing high-quality software.
          </li>
          <li>
            <span className="font-bold text-md">Course Content:</span>Topics
            include software development methodologies, design patterns,
            testing, and project management.
          </li>
          <li>
            <span className="font-bold text-md">Additional Information:</span>No
            prerequisites.
          </li>
        </ul>
        <ul>
          <li className="my-4">
            <span className="font-bold text-xl">
              Cybersecurity and Network Defense
            </span>
          </li>
          <li>
            <span className="font-bold text-md">Course Objectives:</span>Explore
            cybersecurity principles, threats, and defensive strategies to
            secure computer systems and networks.
          </li>
          <li>
            <span className="font-bold text-md">Course Content:</span>Topics
            include cryptography, network security, ethical hacking, and
            security best practices.
          </li>
          <li>
            <span className="font-bold text-md">Additional Information:</span>
            Prerequisite - Basic understanding of networking.
          </li>
        </ul>
        <h5>Mapping between Program Objectives (POs) and Courses:</h5>
        <table className="mt-12 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <tr>
            <th></th>
          </tr>
          <tr>
            <td>
              Here's a visual representation of how each course aligns with the
              Program Objectives (POs):
            </td>
          </tr>
        </table>
        <table className="mt-12  w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <tbody>
            <tr>
              <th>Program Objectives (POs)</th>
              <th>Algorithms and Data Structures</th>
              <th>Machine Learning</th>
              <th>Software Engineering</th>
              <th>Cybersecurity and Network Defense</th>
            </tr>
            <tr>
              <td>PO 1: Advanced Technical Proficiency</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>PO 2: Research Excellence</td>
              <td>✔️</td>
              <td>✔️</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>PO 3: Practical Application</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>PO 4: Interdisciplinary Learning</td>
              <td>✔️</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>PO 5: Ethical and Social Responsibility</td>
              <td>✔️</td>
              <td>✔️</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <p className="mt-8">
          This table provides a clear visual representation of how each course
          aligns with the program objectives. Courses that align with a specific
          objective are marked with a checkmark (✔️).
        </p>
        <p>
          By presenting this information on your program's website or in your
          program brochure, users can easily access detailed information about
          each course, understand the course objectives and content, and see how
          each course contributes to achieving the program objectives.
        </p>
      </section>
    </div>
  );
}
