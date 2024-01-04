// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  console.log("helloo")
  const callapidata = async () => {
    try {
      const call = await axios.get(`https://fakestoreapi.com/products`)
      console.log(data.call)
    } catch (error) {
      console.log("api not found")
    }
  }
}

export default App
