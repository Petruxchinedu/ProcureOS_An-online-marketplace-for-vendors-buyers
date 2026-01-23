api.interceptors.request.use((config) => {
  // 1. Try LocalStorage
  let token = localStorage.getItem("token");

  // 2. If not in LocalStorage, try Cookies
  if (!token && typeof document !== "undefined") {
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
  }

  // 3. LOG FOR DEBUGGING (Delete this after it works)
  console.log("🛡️ Interceptor Token Found:", token ? "YES (starts with " + token.substring(0,5) + ")" : "NO");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});