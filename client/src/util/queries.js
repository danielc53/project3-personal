import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query allUsers {
        users {
            _id
            name
            username
            email
            password
        }
    }
`;

export const QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        user(userId: $userId) {
            _id
            name
        }
    }
`;

export const QUERY_MESSAGE = gql`
    query allMessages {
        messages {
            _id
            message
        }
    }
`

export const QUERY_SINGLE_MESSAGE = gql`
    query singleMessage {
        message {
            _id
            message 
        }
    }
`