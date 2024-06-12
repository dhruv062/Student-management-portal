import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";
import { convertToLocalTimeZone } from "../../utilities/utilities";

export default () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forum, setForum] = useState([]);
  const [forumComments, setForumComments] = useState([{}]);
  const { discussionId } = useParams();
  function handleComment(comment) {
    if (comment.length > 0) {
      setLoading(true);
      axiosInstance
        .post("/api/forums/add_forum_comment ", {
          forum_id: discussionId,
          comment: comment,
        })
        .then((response) => {
          // console.log(response);
          toast.success("Comment posted successfully");
          setLoading(false);
        })
        .catch((error) => {
          // console.log(error);
          setError(error.message);
        });
    }
  }
  useEffect(() => {
    axiosInstance
      .post("/api/forums/get_forum_by_id ", { forum_id: discussionId })
      .then((response) => {
        // console.log(response.data);
        setForum(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    axiosInstance
      .post("/api/forums/get_all_forum_comments ", {
        forum_id: discussionId,
      })
      .then((response) => {
        // console.log(response.data);
        setForumComments(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, [loading]);

  return (
    <React.Fragment>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Discussion
      </h5>

      <div className="relative overflow-x-auto">
        <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sub: {forum.Title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {forum.Description}
          </p>
        </div>
      </div>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Comments
      </h5>
      {forumComments.map((comment) => {
        return <Comment key={comment.comment_id} comment={comment} />;
      })}

      <CommentEditor handleComment={handleComment} />
    </React.Fragment>
  );
};

function Comment({ comment }) {
  return (
    <div>
      <div className="w-full  border border-gray-200 rounded-lg bg-primary dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center  px-3 py-2 border-t dark:border-gray-600">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-4 text-white">
            <p>
              {" "}
              posted by{" "}
              <span className="font-bold underline">
                {comment.user_first_name + " " + comment.user_last_name}{" "}
              </span>
              at {convertToLocalTimeZone(comment.dateposted)}
            </p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white  dark:bg-gray-800">
          <label for="comment" className="sr-only">
            Your comment
          </label>
          <div className="min-h-[80px]">
            <p>{comment.comment}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 ml-12 h-8 w-1"></div>
    </div>
  );
}

function CommentEditor({ handleComment }) {
  const [comment, setComment] = useState("");
  return (
    <React.Fragment>
      <form className="mt-2">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 outline-none dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleComment(comment);
                setComment("");
              }}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900  "
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
