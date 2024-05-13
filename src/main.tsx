import React from 'react';
import ReactDOM from 'react-dom/client';
import { SDKProvider, type SDKInitOptions } from '@tma.js/sdk-react';
import App from './App.tsx';
import './index.css';

import { NextUIProvider } from '@nextui-org/react';

const options: SDKInitOptions = {
  acceptCustomStyles: true,
  cssVars: true,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <SDKProvider options={options}>
        <App />
      </SDKProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
