class SignUpResponse {
  constructor({ email, role, name, isActivated, createdAt, updatedAt }) {
    this.email = email;
    this.role = role;
    this.name = name;
    this.isActivated = isActivated;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default SignUpResponse;
