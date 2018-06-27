const renderChat = obj => {
  const template = document.getElementById('message-template').innerHTML;
  const chat = Mustache.render(template, {
    user: obj.from,
    time: moment(obj.createdAt).format('h:mm a'),
    text: obj.text
  });

  const chatDiv = new DOMParser().parseFromString(chat, 'text/html').querySelector('div');

  chatWindow.insertAdjacentElement('afterbegin', chatDiv);
}

const renderLocation = obj => {
  const template = document.getElementById('location-template').innerHTML;
  const chat = Mustache.render(template, {
    user: obj.user,
    time: moment(obj.createdAt).format('h:mm a'),
    url: obj.url
  });

  const chatDiv = new DOMParser().parseFromString(chat, 'text/html').querySelector('div');

  chatWindow.insertAdjacentElement('afterbegin', chatDiv);
}

const userCountMessage = count => {
  let message;
  count > 1 ? message = `${count} users in the chatroom` : message = `${count} user in the chatroom`;
  return message;
}