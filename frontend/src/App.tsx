import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@/routes/Home";
import GuestList from "@/routes/GuestList/[id]";

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
