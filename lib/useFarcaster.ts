import { useEffect, useState } from 'react';

interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
}

interface FarcasterContext {
  isSDKLoaded: boolean;
  user: FarcasterUser | null;
  isAuthenticated: boolean;
  openUrl: (url: string) => void;
  close: () => void;
}

export function useFarcaster(): FarcasterContext {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkFarcasterSDK = () => {
      if (typeof window !== 'undefined') {
        // Check if we're in an iframe (Farcaster environment)
        if (window.parent !== window) {
          setIsSDKLoaded(true);

          // Try to get user context from URL params
          const urlParams = new URLSearchParams(window.location.search);
          const fid = urlParams.get('fid');
          const username = urlParams.get('username');

          if (fid && username) {
            setUser({
              fid: parseInt(fid),
              username,
              displayName: username,
              pfpUrl: `https://unavatar.io/${username}`
            });
            setIsAuthenticated(true);
          }
        }

        // Listen for messages from parent frame
        const handleMessage = (event: MessageEvent) => {
          if (event.data.type === 'farcaster_user') {
            setUser(event.data.user);
            setIsAuthenticated(true);
          }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
      }
    };

    checkFarcasterSDK();
  }, []);

  const openUrl = (url: string) => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'open_url', url }, '*');
    } else {
      window.open(url, '_blank');
    }
  };

  const close = () => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'close' }, '*');
    }
  };

  return {
    isSDKLoaded,
    user,
    isAuthenticated,
    openUrl,
    close
  };
}