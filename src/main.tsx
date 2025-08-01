import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'react-useful-kit/dist/react-useful-kit.css';
import { AlertProvider } from 'react-useful-kit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </StrictMode>
);
