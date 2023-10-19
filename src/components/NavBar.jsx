import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex fixed top-0 left-0 right-0 z-40">
      <ul className="flex gap-x-5">
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
    </nav>
  );
}

export default NavBar;
