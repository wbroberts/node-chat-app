const generateMessage = (who, message) => {
  return {
    from: who,
    text: message,
    createdAt: Date.now()
  }
}

const generateLocationMessage = (user, lat, long) => {
  return {
    user,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt: Date.now()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}