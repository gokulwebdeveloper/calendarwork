import axios from 'axios';

function getObjects(url) {
  return axios.get(url,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }).then((response) => {
    return response;
  });
  ;
}

export {
  getObjects,
};