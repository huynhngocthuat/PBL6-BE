class InstructorResponse {
  constructor({ id, email, fullName, role, avatarUrl = null }) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.role = role;
    this.avatarUrl = avatarUrl;
  }
}

export default InstructorResponse;
