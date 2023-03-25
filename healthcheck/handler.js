module.exports.healthcheck = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'healthCheck',
        event: event
      }),
      headers: {}
    }
  }