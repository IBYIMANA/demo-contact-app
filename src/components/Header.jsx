import { Link } from "react-router-dom"
import Navigation from "./Navigation"

const Header = () => {
  return (
    <header>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <Link to={'/'} className="text-2xl font-bold text-gray-900 sm:text-3xl">Home</Link>

            <p className="mt-1.5 text-sm text-gray-500">Let's manage our contacts! 🎉</p>
          </div>

          <div className="flex flex-col gap-4 mt-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link
              className="block px-5 py-3 text-sm font-medium text-black transition rounded-lg bg-lime-600 hover:bg-gray-300 focus:outline-none focus:ring"
              to="/add"
            >
              Create Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header