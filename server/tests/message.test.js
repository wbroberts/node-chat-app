const expect = require('expect');

const { generateMessage } = require('./../utils/message');

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