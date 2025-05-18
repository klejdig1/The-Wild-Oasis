import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from "./styles/GlobalStyles.js";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
              <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
          )}
          onReset={() => window.location.replace("/")}
      >
          <GlobalStyles />
          <App />
      </ErrorBoundary>

  </React.StrictMode>,
)
