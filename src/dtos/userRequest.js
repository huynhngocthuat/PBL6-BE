class UserRequest {
  constructor({ userId, reason, status }) {
    this.userId = userId;
    this.reason = reason || '';
    this.status = status;
  }
}

export default UserRequest;
