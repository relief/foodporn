/* eslint-disable no-undef */
function fetchEntries(query, cb) {
  return fetch(`api/entries`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function likeEntrie(query, cb) {
  return fetch(`api/entrie/${query}?type=like`, {
    method: "POST",
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function fetchRestaurant(query, cb) {
  return fetch(`api/restaurant/${query}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { fetchRestaurant, fetchEntries, likeEntrie };
export default Client;
