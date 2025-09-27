// App.jsx
import axios from './utils/axios.customize.js'

// import axios from 'react'  
import { useEffect } from 'react'
import Header from './component/layout/header.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  useEffect(() => {
    const fetchHelloworld = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/api`)
        console.log("Kiểm tra", res)
      } catch (error) {
        console.error("Lỗi khi fetch data:", error)
      }
    }
    fetchHelloworld()
  }, [])
  return (
    <>
      <Header />
      <Outlet />
    </>


  )
}

export default App