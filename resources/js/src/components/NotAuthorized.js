import { Link } from "react-router-dom";
export default function NotAuthorized({ message }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h6 className="mb-4 tracking-tight font-extrabold  text-primary-600 dark:text-primary-500">
            UnAuthorized
          </h6>

          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            You are Not Authorized to access this page. Please contact your
            administrator.
          </p>
          <Link
            to="/"
            className="inline-flex text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
