const headers = {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Content-Type": "application/json",
  };
  
  const Success = (data, statusCode = 200) => {
    return {
      statusCode,
      body: JSON.stringify(data),
      headers,
    };
  };
  const NotFound = (errorMessage = "Not Found", statusCode = 404) => {
    return {
      statusCode,
      body: JSON.stringify(errorMessage),
      headers,
    };
  };
  const Error = (errorMessage, statusCode = 500) => {
    return {
      statusCode,
      body: JSON.stringify(errorMessage),
      headers,
    };
  };
  
  module.exports = {
    Success,
    Error,
    NotFound,
  };