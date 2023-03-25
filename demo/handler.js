module.exports.demo = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'demo',
        event: event
      }),
      headers: {}
    }
  }