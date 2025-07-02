import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import OngDetail from './pages/OngDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} /> 
          <Route path='/ong-details/:id' element={<OngDetail />} />
          <Route path='*' element={<NotFound />} /> 
        </Routes>  
      </BrowserRouter>
    </div>
  )
}

