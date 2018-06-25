const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./../utils/message');

describe('generateMessage', () => {

  it('should create a message object', () => {
    const who = 'Fake User';
    const text = 'Fake dummy text';
    const createdMessage = generateMessage(who, text);

    expect(typeof createdMessage).toBe('object');
    expect(createdMessage.from).toBe(who);
    expect(createdMessage.text).toBe(text);
    expect(typeof createdMessage.createdAt).toBe('number');
  });

});

describe('generateLocationMessage', () => {

  it('should generate correct location object', () => {
    const user = 'Fake';
    const lat = 1;
    const long = 1;
    const location = generateLocationMessage(user, lat, long);

    expect(typeof location).toBe('object');
    expect(location.user).toBe(user);
    expect(location.url).toBe(`https://www.google.com/maps?q=1,1`);
    expect(location.createdAt).toBeDefined();
    });

});