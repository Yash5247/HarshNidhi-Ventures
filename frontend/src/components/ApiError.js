import React from 'react';
import './ApiError.css';

const ApiError = ({ error, onRetry, message }) => {
  const getErrorMessage = () => {
    if (message) return message;
    
    if (error?.message?.includes('404') || error?.message?.includes('NOT_FOUND')) {
      return 'The requested resource was not found. The backend service may be unavailable.';
    }
    
    if (error?.message?.includes('Failed to fetch') || error?.message?.includes('NetworkError')) {
      return 'Unable to connect to the server. Please check your internet connection or try again later.';
    }
    
    return error?.message || 'An unexpected error occurred. Please try again.';
  };

  return (
    <div className="api-error">
      <div className="api-error-content">
        <div className="api-error-icon">🔌</div>
        <h3>Connection Error</h3>
        <p>{getErrorMessage()}</p>
        <div className="api-error-actions">
          {onRetry && (
            <button onClick={onRetry} className="btn btn-primary">
              Try Again
            </button>
          )}
          <a 
            href="https://github.com/Yash5247/HarshNidhi-Ventures" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View Documentation
          </a>
        </div>
        <div className="api-error-info">
          <p><strong>💡 Tip:</strong> Make sure the backend server is running and accessible.</p>
          <p>For local development, ensure the backend is running on <code>http://localhost:8000</code></p>
        </div>
      </div>
    </div>
  );
};

export default ApiError;

