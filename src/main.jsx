import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const root = createRoot(document.getElementById('root'));


if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  root.render(
    <main>
      <h1>Missing Supabase configuration</h1>
      <p>Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.</p>
    </main>
  )
} else {
  import('./App.jsx').then(({ default: App }) => {
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    )
  })
}
