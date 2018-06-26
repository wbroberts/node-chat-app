const renderChat = obj => {
  const template = document.getElementById('message-template').innerHTML;
  const chat = Mustache.render(template, {
    user: obj.from,
    time: moment(obj.createdAt).format('h:mm a'),
    text: obj.text
  });

  chatWindow.innerHTML += chat;
}

const renderLocation = obj => {
  const template = document.getElementById('location-template').innerHTML;
  const chat = Mustache.render(template, {
    user: obj.user,
    time: moment(obj.createdAt).format('h:mm a'),
    url: obj.url
  });

  chatWindow.innerHTML += chat;
}

const userCountMessage = count => {
  let message;
  count > 1 ? message = `${count} users in the chatroom` : message = `${count} user in the chatroom`;
  return message;
}