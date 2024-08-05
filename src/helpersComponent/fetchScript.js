function fetchScript(url) {
   return new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      script.src = url;
      script.async = 'async';

      document.head.appendChild(script);
   });
}

export default fetchScript;
