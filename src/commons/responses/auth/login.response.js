class LoginResponse {
  constructor({ token, refreshToken }) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}

export default LoginResponse;
