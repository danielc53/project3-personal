import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation createUser($name: String!, $username: String, $email: String!, $password: String!) {
        createUser(name: $name, username: $username, email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
`

export const ADD_MESSAGE = gql`
    mutation createMessage($userId: ID, $message: String!) {
        createMessage(userId: $userId, message: $message) {
            _id
            name
            message
        }
    }
    
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                name
            }
        }
    }
    
`