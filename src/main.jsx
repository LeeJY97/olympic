import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // 입력값에 따라 동일한 값이 나오게 하는 것이 함수형 패러다임
  // 동일한 값이 확실히 나오는지에 대한 비교 ?
  // <StrictMode>
  <App />
  // </StrictMode>,
)
