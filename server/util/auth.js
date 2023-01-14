const jwt = require('jsonwebtoken');

const secret = 'noOneCanCrackThis123';
const expiration = '1h';

module.exports = {
    authMiddleware({ req }) {
        // allows us to send the token in the request body, the request query, or the request header
        let token = req.body.token || req.query.token || req.header.authorization;
        // if we are sending the token in the request header, then we need to split the string into an array via the space
        // pop removes the last index and trim will delete the space if there is any after removing the last index
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        // if the token is expired/nonexistent, we will return the request
        if (!token) {
            return req;
        }
        // if the token CAN be verified, decode the data so the resolver can access it and complete the request
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        return req;
    },
    signToken: function ({ email, _id }) {
        return jwt.sign({ data: { email, _id } }, secret, { expiresIn: expiration });
    }
};