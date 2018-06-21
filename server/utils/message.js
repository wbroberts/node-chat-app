const generateMessage = (who, message) => {
  return {
    from: who,
    text: message,
    createdAt: Date.now()
  }
}

module.exports = {
  generateMessage
}