import axios from 'axios';

async function makePredictPostRequest(filename, filedata) {
  try {
    const response = await axios.post('/api/predict', {
      filename: filename,
      filedata: filedata
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export default makePredictPostRequest;