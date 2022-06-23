
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Formulario } from "./pages/Formulario";
import { Resultados } from "./pages/resultados";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index  element={<Home />}/>
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
