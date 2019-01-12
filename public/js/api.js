// Source: https://stackoverflow.com/questions/8064691/how-do-i-pass-along-variables-with-xmlhttprequest
function formatParams(params) {
  return Object
    .keys(params)
    .map(function(key) {
      return key+'='+encodeURIComponent(params[key])
    })
    .join('&');
}

// params is given as a JSON
function get(endpoint, params) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    const fullPath = endpoint + '?' + formatParams(params);
    xhr.open('GET', fullPath, true);
    xhr.onload = function(err) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.onerror = function(err) {
      reject(xhr.statusText);
    }
    xhr.send(null);
  });
}

function post(endpoint, params) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.withCredentials = true;
    xhr.onload = function(err) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.onerror = function(err) {
      reject(xhr.statusText);
    };
    xhr.send(JSON.stringify(params));
  });
}
