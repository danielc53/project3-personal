import decode from 'jwt-decode';

class AuthService {
    // import this function into the user profile 
    getProfile() {
      return decode(this.getToken());
    }
  
    loggedIn() {
      const token = this.getToken();
      return token && !this.isTokenExpired(token) ? true : false;
    }
  
    isTokenExpired(token) {
      const decodedToken = decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem('id_token');
        return true;
      }
      return false;
    }
  
    getToken() {
      return localStorage.getItem('id_token');
    }
  
    login(idToken) {
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
    }
  
    // when the user clicks the logout button, we remove the token we initially set to local storage when they logged in.
    logout() {
      localStorage.removeItem('id_token');
      window.location.reload();
    }
  }
  
  export default new AuthService();