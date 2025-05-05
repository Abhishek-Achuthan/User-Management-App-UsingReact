import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from './store/store.ts'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer/>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
