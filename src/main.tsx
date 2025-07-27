import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'react-useful-kit/dist/react-useful-kit.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
