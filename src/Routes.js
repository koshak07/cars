import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuserContextProvider from './contexts/AuserContext';
import AddPage from './pages/AddPage';
import MainPage from './pages/MainPage';

const MyRoutes = () => {
    return (
        <AuserContextProvider>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/auser/add" element={<AddPage/>}/>
            </Routes>
        </BrowserRouter>
        </AuserContextProvider>
    );
};

export default MyRoutes;