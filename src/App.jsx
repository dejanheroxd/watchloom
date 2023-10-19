import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Movies from "./pages/movies/Movies";
import MyList from "./pages/myList/MyList";
import RecentlyAdded from "./pages/recentlyAdded/RecentlyAdded";
import TvSeries from "./pages/tvSeries/TvSeries";
import NavBar from "./components/NavBar";
import MovieContextProvider from "./context/movie-context";

function App() {
  return (
    <div>
      <MovieContextProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="myList" element={<MyList />} />
            <Route path="recentlyAdded" element={<RecentlyAdded />} />
            <Route path="tvSeries" element={<TvSeries />} />
          </Routes>
        </Router>
      </MovieContextProvider>
    </div>
  );
}

export default App;
