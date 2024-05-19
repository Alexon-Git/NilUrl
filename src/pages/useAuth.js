import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = Cookies.get('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!accessToken || !refreshToken) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      try {
        const decodedAccessToken = jwtDecode(accessToken); 
        const currentTime = Date.now() / 1000;

        if (decodedAccessToken.exp < currentTime) {
          const decodedRefreshToken = jwtDecode(refreshToken); 

          if (decodedRefreshToken.exp < currentTime) {
            setIsLoggedIn(false);
            setIsLoading(false);
            localStorage.removeItem('refresh_token');
            Cookies.remove('access_token');
          } else {
            try {
              const response = await fetch('/refresh-token-endpoint.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
              });
              const data = await response.json();
              if (data.accessToken) {
                Cookies.set('access_token', data.accessToken);
                setIsLoggedIn(true);
              } else {
                setIsLoggedIn(false);
              }
              setIsLoading(false);
            } catch (error) {
              console.error('Ошибка при обновлении access токена:', error);
              setIsLoggedIn(false);
              setIsLoading(false);
            }
          }
        } else {
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Ошибка при расшифровке токенов:', error);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    };

    checkTokens();
  }, []);

  return { isLoggedIn, isLoading, isRedirected, setIsRedirected };
};

export default useAuth;
