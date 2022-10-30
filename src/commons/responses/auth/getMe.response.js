class GetMeResponse {
  constructor({ email, fullName, role, id, avatarUrl }) {
    this.email = email;
    this.fullName = fullName;
    this.role = role;
    this.userId = id;
    this.avatarUrl = avatarUrl || null;
  }
}

export default GetMeResponse;
