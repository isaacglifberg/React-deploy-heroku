import React from 'react';
// import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionComponent from '../components/chatbot';




export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<QuestionComponent/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
