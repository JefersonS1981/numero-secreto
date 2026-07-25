import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="no-print bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-slate-800">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              📘
            </span>
            Plano Certo
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-md ${location.pathname === '/' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-gray-100'}`}
            >
              Meus planos
            </Link>
            <Link
              to="/importar-bncc"
              className={`px-3 py-1.5 rounded-md ${location.pathname === '/importar-bncc' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-gray-100'}`}
            >
              Importar BNCC
            </Link>
            <Link
              to="/novo"
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            >
              + Novo plano
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="no-print text-center text-xs text-slate-400 py-4">
        Plano Certo — planejamento de aulas para todos os níveis, alinhado à BNCC. Dados salvos apenas neste navegador.
      </footer>
    </div>
  )
}
