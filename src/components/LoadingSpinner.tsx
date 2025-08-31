import React from 'react';
import '../styles/LoadingSpinner.css';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container" role="status" aria-label="Loading">
      <div className="loading-spinner">
        <div className="spinner-inner"></div>
      </div>
      <p className="loading-text">Loading Championship Data...</p>
    </div>
  );
};