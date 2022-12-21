class UserRequestUpdate {
  constructor({ id, reason, status }) {
    this.id = id;
    this.reason = reason || '';
    this.status = status;
  }
}

export default UserRequestUpdate;
