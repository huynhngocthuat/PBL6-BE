class SignUpResponse {
  constructor({ email, role, fullName, isActivated }) {
    this.email = email;
    this.role = role;
    this.fullName = fullName;
    this.isActivated = isActivated;
  }
}

export default SignUpResponse;
