const html = `
<!DOCTYPE html>
<html> 
<head> 
<p id= "call" > </p>
<script> 
const sendHttpRequest = (method, url, data) => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  return fetch(proxyurl + url, {
  method: method,
  body: JSON.stringify(data),
  headers: data ? { 'Content-Type': 'application/json' } : {}
}).then(response => {
  if (response.status >= 400) {
    return response.json().then(errResponseData => {
      const error = new Error('There is an error!');
      error.data = errResponseData;
      throw error;
    });
  }
  responseData= response.json();
  return responseData;
});
};
const getData = () => {
  sendHttpRequest('GET', 'https://cfw-takehome.developers.workers.dev/api/variants').then(responseData => {
    //console.log(responseData);
    var x =" ";
    for (i in responseData) {
        x += responseData[i];
       
      }
      //console.log(x);
      //console.log(typeof(x));
      var y = x.split(",");
      //console.log(y);
      //console.log(y[0]);
      //console.log(y[1]);
      if (localStorage.getItem("previousurl") == y[1]){
      window.open(y[0],"_self");
      localStorage.setItem("previousurl", y[0]);
    } else{
        window.open(y[1],"_self");
      localStorage.setItem("previousurl", y[1]);
    }
  });
};
document.getElementById("call").innerHTML = getData(); 
</script> 
</head>
</html>
`
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

async function handleRequest(request) {
  const temp =  new Response( html, {
    headers: { 'content-type': 'text/html' },
  });
  return temp;
}

