// App.js
import { Routes, Route } from "react-router-dom";
import { QRProvider } from './QRContext/QRContext';
import Home from './Components/Home/Home';
import './App.css';

function App() {
  return (
    <QRProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:lang" element={<Home />} />
        </Routes>
    </QRProvider>
  );
}

export default App;