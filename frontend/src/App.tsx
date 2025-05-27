import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { AppRouter } from './router/AppRouter';
import "@fontsource/roboto/300.css"
function App() {
  return (
    <AppRouter/>
  )
}

export default App
