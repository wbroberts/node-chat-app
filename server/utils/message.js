const moment = require('moment');

const generateMessage = (who, message) => {
  return {
    from: who,
    text: message,
    createdAt: moment().valueOf()
  }
}

const generateLocationMessage = (user, lat, long) => {
  return {
    user,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt: moment().valueOf()
  }
}

const generateUsers = (count) => {
  return {
    totalUsers: count
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage,
  generateUsers
}