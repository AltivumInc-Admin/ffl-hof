import { useState } from 'react';
import { useESPNData } from '../hooks/useESPNData';

export const ESPNDebug = () => {
  const [showDebug, setShowDebug] = useState(false);
  const espnData = useESPNData();

  if (!showDebug) {
    return (
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <button 
          onClick={() => setShowDebug(true)}
          style={{ 
            background: '#D4AF37', 
            color: '#0A1120', 
            border: 'none', 
            padding: '8px 12px', 
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          ESPN Debug
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#1A202C',
      color: '#FFFFFF',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #D4AF37',
      maxWidth: '400px',
      maxHeight: '600px',
      overflow: 'auto',
      zIndex: 1000,
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, color: '#D4AF37' }}>ESPN Debug Info</h3>
        <button 
          onClick={() => setShowDebug(false)}
          style={{ 
            background: 'transparent', 
            color: '#FFFFFF', 
            border: '1px solid #FFFFFF', 
            padding: '4px 8px', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          ✕
        </button>
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Loading:</strong> {espnData.isLoading ? 'Yes' : 'No'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Error:</strong> {espnData.error || 'None'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Last Updated:</strong> {espnData.lastUpdated?.toLocaleString() || 'Never'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Current Week:</strong> {espnData.currentWeek}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Teams Count:</strong> {espnData.teams.length}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Has Data:</strong> {espnData.hasData ? 'Yes' : 'No'}
      </div>
      
      {espnData.teams.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <strong>First Team:</strong>
          <div style={{ marginLeft: '8px' }}>
            Name: {espnData.teams[0].teamName}<br/>
            Manager: {espnData.teams[0].managerName}<br/>
            Record: {espnData.teams[0].wins}-{espnData.teams[0].losses}-{espnData.teams[0].ties}<br/>
            Has Roster: {'roster' in espnData.teams[0] && espnData.teams[0].roster ? 'Yes' : 'No'}<br/>
            {('roster' in espnData.teams[0] && espnData.teams[0].roster) && (
              <>Roster Size: {espnData.teams[0].roster.length}</>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={espnData.refreshData}
        style={{ 
          background: '#D4AF37', 
          color: '#0A1120', 
          border: 'none', 
          padding: '6px 12px', 
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          marginTop: '8px'
        }}
        disabled={espnData.isLoading}
      >
        {espnData.isLoading ? 'Refreshing...' : 'Refresh Data'}
      </button>
    </div>
  );
};