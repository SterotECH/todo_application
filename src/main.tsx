import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Loading } from './components/Loading.tsx'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <StrictMode>
        <App />
        <Analytics />
      </StrictMode>
    </PersistGate>
  </Provider>,
)
