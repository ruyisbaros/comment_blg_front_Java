import Post from "./components/PostComponent/Post";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/nav/Header";
import Footer from "./components/footer/Footer";
import User from "./components/userComponent/User";


function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-center" limit={1} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:userId" element={<User />} />

      </Routes>
      {/*  <Footer /> */}
    </div>
  );
}

export default App;
