import React from 'react';
import ReactDOM from 'react-dom/client';
import { SDKProvider } from '@tma.js/sdk-react';
import App from './App.tsx';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SaadatCalc from './components/SaadatCalc.tsx';
import YogiCalc from './components/YogiCalc.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/yogi',
    element: <YogiCalc />,
  },
  {
    path: '/saadat',
    element: <SaadatCalc />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <SDKProvider acceptCustomStyles debug>
        <RouterProvider router={router} />
      </SDKProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
