import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import NovoPlano from './wizard/NovoPlano'
import VisualizarPlano from './pages/VisualizarPlano'
import ImportarBNCC from './pages/ImportarBNCC'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/novo" element={<NovoPlano />} />
          <Route path="/plano/:id" element={<VisualizarPlano />} />
          <Route path="/plano/:id/editar" element={<NovoPlano />} />
          <Route path="/importar-bncc" element={<ImportarBNCC />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
