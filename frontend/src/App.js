import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './pages/Start';
import Home from './pages/Home';
import Start_page from './pages/Start_page';
import './pages/Start_page.css';


function App(){
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/start" element={<Start_page />} />    //초기화면 진입

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
