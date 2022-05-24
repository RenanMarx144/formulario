
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Formulario } from "./pages/Formulario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index  element={<Home />}/>
        <Route path="/formulario" element={<Formulario />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
