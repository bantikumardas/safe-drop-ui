import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieList from "./page/MovieList";
import Home from "./page/Home";
import Upload from "./page/Upload";
import Download from "./page/Download";
import About from "./page/About";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/movie" element={<MovieList />} />
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/download" element={<Download />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
