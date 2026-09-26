import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import Dashboard from "./pages/Dashboard";
import Veiculos from "./pages/Veiculos";
import Manutencoes from "./pages/Manutencoes";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/veiculos" element={<Veiculos />} />
                <Route path="/manutencoes" element={<Manutencoes />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;