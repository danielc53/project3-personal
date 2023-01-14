const db = require('../config/connection.js');


const { User, Message, Chat } = require('../models');

const userData = require('./userData.json');
const messageData = require('./messageData.json');
const chatData = require('./chatData.json')


db.once('open', async () => {
    try {
        console.log('this happens')
        await User.deleteMany({});
        await Chat.deleteMany({});
        await Message.deleteMany({});
        

        const users = await User.create(userData);
        console.log('User Data successfully seeded');
        
        const chat = await Chat.create(chatData);
        console.log('Chat Data successfully seeded');

        const messages = await Message.create(messageData);
        console.log('Message Data successfully seeded');

        



        

        process.exit(0);
    } catch (err) {
        throw err;
    }
});

