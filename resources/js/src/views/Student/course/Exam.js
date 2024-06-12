import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default () => {

    const questions = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Mars", "Earth"],
      },
      // Add more questions as needed
    ];

  const [answers, setAnswers] = useState({});
    useEffect(() => {
      console.log(answers);
    }, [answers]);
  const handleSelect = (questionIndex, selectedOption) => {
    setAnswers({
      ...answers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmit = () => {
    // Handle submission logic (e.g., send answers to the server)
    console.log("Submitted Answers:", answers);
  };

  return (
    <div>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Exam 
      </h5>
      {questions.map((question, index) => (

        <Question
          key={index}
          number = {index+1}
          question={question.question}
          options={question.options}
          onSelect={(selectedOption) => handleSelect(index, selectedOption)}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};



const Question = ({ question,number, options, onSelect }) => {
  return (
    <div>
      <h3 className="font-bold mb-4">
        {number + ") "}
        {question}
      </h3>
      <ul className="pl-6 mb-4">
        <form>
          {options.map((option, index) => (
            <li key={index} >
              <label>
                <div className="flex w-60 justify-between items-center">
                  <div>{option}</div>
                  <div>
                    <input
                    className="cursor-pointer"
                      type="radio"
                      name="answer"
                      value={option}
                      onChange={() => onSelect(option)}
                    />
                  </div>
                </div>
              </label>
            </li>
          ))}
        </form>
      </ul>
    </div>
  );
};