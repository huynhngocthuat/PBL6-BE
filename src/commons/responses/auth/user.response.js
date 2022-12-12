class UserResponse {
  constructor({
    id,
    email,
    fullName,
    avatarUrl,
    isActivated,
    role,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.fullName = fullName;
    this.isActivated = isActivated;
    this.avatarUrl = avatarUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default UserResponse;
