class SignInResponse {
  constructor({ token, refreshToken }) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.expiresIn = process.env.JWT_EXPIRES;
    this.type = 'Bearer';
  }
}

export default SignInResponse;
