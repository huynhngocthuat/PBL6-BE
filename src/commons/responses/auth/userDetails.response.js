class UserDetailsResponse {
  constructor({
    email,
    role,
    fullName,
    isActivated,
    occupation,
    phone,
    payment,
    dateOfBirth,
    identityImageUrl,
    createdAt,
    userId,
    avatarUrl,
  }) {
    this.email = email;
    this.role = role;
    this.fullName = fullName;
    this.isActivated = isActivated;
    this.occupation = occupation;
    this.phone = phone;
    this.payment = payment;
    this.dateOfBirth = dateOfBirth;
    this.identityImageUrl = identityImageUrl;
    this.createdAt = createdAt;
    this.userId = userId;
    this.avatarUrl = avatarUrl;
  }
}

export default UserDetailsResponse;
