module.exports.work = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'work',
        event: event
      }),
      headers: {}
    }
  }