const { signToken } = require('../util/auth');
const { AuthenticationError } = require('apollo-server-express');
const { User, Message, Chat } = require('../models');

const resolvers = {
    //todo define resolvers
    Query: {
        // to query a single user, we pass through a userId object that points to the typedefs
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        // query all users in the database
        users: async () => {
            return User.find();
        },
        // query a specific/single message based on the userId and the messageId
        message: async () => {
            return Message.findOne({});
        },
        // query all messages from a user
        messages: async () => {
            return Message.find({});
        },
        
    },

    Mutation: {
        createUser: async (parent, { name, username, email, password }) => {
            const user = await User.create({ name, username, email, password });
            const token = signToken(user)
            return { token, user };
        },
        createMessage: async (parent, args, context) => {
            if (context.user) {
                const message = await Message.create(args);
                return message;
            }

        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const validPw = await user.matchPassword(password);

            if (!validPw) {
                throw new AuthenticationError('Incorrect password, try again.');
            }

            const token = signToken(user);
            return { token, user };
        },
    }
}

module.exports = resolvers;