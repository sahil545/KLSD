"use client";

import React, { useState, useEffect } from 'react';

interface DevStatusProps {
  className?: string;
}

export function DevStatus({ className = "" }: DevStatusProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'slow'>('online');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      
      // Monitor connection status
      const checkConnection = async () => {
        try {
          const start = Date.now();
          const response = await fetch('/api/ping', { 
            method: 'HEAD',
            cache: 'no-cache' 
          });
          const duration = Date.now() - start;
          
          if (response.ok) {
            setConnectionStatus(duration > 5000 ? 'slow' : 'online');
          } else {
            setConnectionStatus('offline');
          }
          setLastUpdate(new Date());
        } catch (error) {
          setConnectionStatus('offline');
          setLastUpdate(new Date());
        }
      };

      // Check immediately and then every 30 seconds
      checkConnection();
      const interval = setInterval(checkConnection, 30000);

      return () => clearInterval(interval);
    }
  }, []);

  if (!isVisible) return null;

  const statusColors = {
    online: 'bg-green-500',
    slow: 'bg-yellow-500',
    offline: 'bg-red-500'
  };

  const statusText = {
    online: 'Dev Server Online',
    slow: 'Dev Server Slow',
    offline: 'Dev Server Offline'
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[connectionStatus]}`}></div>
          <span className="font-medium">{statusText[connectionStatus]}</span>
        </div>
        <div className="text-gray-500 mt-1">
          Last check: {lastUpdate.toLocaleTimeString()}
        </div>
        <div className="text-gray-400 text-[10px] mt-1">
          Dev Mode Only
        </div>
      </div>
    </div>
  );
}
