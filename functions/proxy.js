const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path } = event;
  const targetUrl = `https://spacenews.com/api`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();

    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
