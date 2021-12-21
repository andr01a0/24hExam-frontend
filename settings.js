export default function () {
    const isLocalhost =
      window.location.host.indexOf("127.0.0.1") != -1 ||
      window.location.host.indexOf("localhost") != -1;
  
    const localApiUrl = "http://localhost:8080";
    const prodApiUrl = "http://localhost:8080";
  
    window.apiUrl = isLocalhost ? localApiUrl : prodApiUrl;
  }