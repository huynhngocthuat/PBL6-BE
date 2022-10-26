class SignInResponse {
  constructor({ token, refreshToken }) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}

export default SignInResponse;
