import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="http://localhost:5173/tonconnect-manifest.json">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
