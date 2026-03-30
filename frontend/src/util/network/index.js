import { checkStatus } from "./helper";
import { getStorage } from "@/util/storage";
import { portalUrl } from "@/util/config";

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
};

export async function requestPortal(url, options = {}) {
  const accessToken = getStorage("accessToken");
  const actualUrl = `${portalUrl}${url}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const actualOptions = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(actualUrl, actualOptions);
    
    if (response.status === 401 && !url.includes('auth/login') && !url.includes('auth/refresh')) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await fetch(`${portalUrl}auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Credentials: true is needed for cookie-based refresh
          });
          
          const refreshData = await refreshRes.json();
          
          if (refreshData.status === 'SUCCESS') {
            const newAccessToken = refreshData.response.accessToken;
            localStorage.setItem('accessToken', newAccessToken); // or use setStorage
            isRefreshing = false;
            onRefreshed(newAccessToken);
          } else {
            // Refresh failed, logout
            isRefreshing = false;
            handleLogout();
            throw new Error('Session expired');
          }
        } catch (err) {
          isRefreshing = false;
          handleLogout();
          throw err;
        }
      }

      // Wait for refresh to complete
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          actualOptions.headers["Authorization"] = `Bearer ${token}`;
          resolve(fetch(actualUrl, actualOptions).then(checkStatus));
        });
      });
    }

    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
}
