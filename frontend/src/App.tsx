import GuestList from "@/routes/GuestList/[id]";
import Home from "@/routes/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guestlist/:id" element={<GuestList />} />
      </Routes>
    </Router>
  );
}

export default App;
