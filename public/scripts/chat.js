const socket = io();

const messageForm = document.getElementById('message-form');
const chatWindow = document.querySelector('.chat-window');
const sendLocation = document.getElementById('send-location');
const userCounter = document.querySelector('.user-counter');

let username = 'User';

// Sends out message when form is submitted
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const message = e.target[0].value;
  // Send the message to the server
  socket.emit('createMessage', { from: username, text: message }, message => {
    renderChat(message)
  });
  
  // Reset the input 
  e.target[0].value = '';
});

//Send location button listening
sendLocation.addEventListener('click', e => {
  if (!navigator.geolocation) {
    return alert('This feature is not supported by your browser');
  }
  // Make it so button is disabled while fetching location
  sendLocation.setAttribute('disabled', 'disabled');
  sendLocation.innerText = 'Sending...';

  // Fetches the location and sends it to server
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('createLocationMessage', {
      username,
      lat: position.coords.latitude,
      long: position.coords.longitude
    });

    // Enable location button
    sendLocation.removeAttribute('disabled');
    sendLocation.innerText = 'Location';
  }, error => {
    // Enable location button
    sendLocation.removeAttribute('disabled');
    sendLocation.innerText = 'Location';
    alert('Unable to get your location');
  })
});

// When a user connects it sends a message
socket.on('connect', () => {
  socket.on('connectMessage', message => renderChat(message));
});

// When a message comes in it renders it
socket.on('newMessage', message => renderChat(message));

// When a location comes in it renders the link
socket.on('newLocation', location => renderLocation(location));

// When a new user connects it sends a message and updates the counter
socket.on('newUser', message => {
  renderChat(message[0]);
  userCounter.textContent = userCountMessage(message[1].totalUsers);
});

// Updates the counter when someone connects
socket.on('addUser', message => {
  userCounter.textContent = userCountMessage(message.totalUsers);
});

// Updates the user count when someone disconnects
socket.on('removeUser', message => {
  renderChat(message[0]);
  userCounter.textContent = userCountMessage(message[1].totalUsers);  
});