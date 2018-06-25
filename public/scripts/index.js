const socket = io();

const messageForm = document.getElementById('message-form');
const chatWindow = document.querySelector('.chat-window');
const sendLocation = document.getElementById('send-location');

let username;

// Sends out message when form is submitted
messageForm.addEventListener('submit', e => {
  e.preventDefault();

  username = e.target[0].value;
  const message = e.target[1].value;

  socket.emit('createMessage', { from: username, text: message }, (message) => {
    renderChat(message)
  });

  e.target[1].value = '';
});

//Send location button listening
sendLocation.addEventListener('click', e => {
  if (!navigator.geolocation) {
    return alert('This feature is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('createLocationMessage', {
      username,
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  }, error => {
    alert('Unable to get your location');
  })
});




socket.on('connect', () => {
  socket.on('connectMessage', message => {
    renderChat(message);
  });
});

socket.on('newMessage', message => {
  renderChat(message)
});

socket.on('newLocation', location => {
  const p = document.createElement('p');
  const a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', `${location.url}`);
  a.textContent = 'View location'
  p.insertAdjacentElement('afterbegin', a);
  chatWindow.insertAdjacentElement('beforeend', p);
});

socket.on('newUser', message => {
  renderChat(message);
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

const renderChat = obj => {
  const div = document.createElement('div');
  div.className = 'chat';

  const p = document.createElement('p');
  p.textContent = `${obj.from}: ${obj.text}`;
  div.insertAdjacentElement('afterbegin', p);
  
  obj.from === username ? p.className = 'right' : p.className = 'left';

  chatWindow.insertAdjacentElement('beforeend', div);
}