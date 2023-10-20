import {
  CaretDown,
  Copyright,
  MagnifyingGlass,
  UserCircle,
} from "phosphor-react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex justify-between px-14 items-center fixed top-0 left-0 right-0 z-40 text-white pt-10 ">
      <div className="flex items-end">
        <p className="text-2xl font-semibold">WatchLoom</p>
        <Copyright size={18} className="mb-[3px] text-gray-300/70" />
      </div>
      <ul className="flex gap-x-10 font-semibold mr-[500px]">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="movies">
          <li>Movies</li>
        </Link>
        <Link to="tvSeries">
          <li>TV Series</li>
        </Link>
        <Link to="recentlyAdded">
          <li>Recently Added</li>
        </Link>
        <Link to="myList">
          <li>My List</li>
        </Link>
      </ul>
      <div className="flex items-center">
        <div className="px-3 py-3 border rounded-full">
          <MagnifyingGlass size={21} weight="bold" />
        </div>
        <div className="flex items-center pl-14">
          <UserCircle size={55} weight="fill" />
          <div className="bg-white px-3 py-3 rounded-full">
            <CaretDown size={20} weight="fill" color="black" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
