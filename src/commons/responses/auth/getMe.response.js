class GetMeResponse {
  constructor({ email, fullName, role, id, avatarUrl, createdAt }) {
    this.email = email;
    this.fullName = fullName;
    this.role = role;
    this.userId = id;
    this.createdAt = createdAt;
    this.avatarUrl = avatarUrl || null;
  }
}

export default GetMeResponse;
