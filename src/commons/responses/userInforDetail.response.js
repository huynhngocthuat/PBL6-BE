class UserInforDetailResponse {
  constructor({
    id,
    fullName,
    email,
    avatarUrl,
    role,
    address,
    phone,
    occupation,
    isActivated,
    dateOfBirth,
    identityImageUrl,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.avatarUrl = avatarUrl || '';
    this.role = role;
    this.address = address;
    this.phone = phone;
    this.occupation = occupation;
    this.isActivated = isActivated;
    this.dateOfBirth = dateOfBirth;

    // eslint-disable-next-line no-param-reassign
    identityImageUrl = identityImageUrl || '';
    if (identityImageUrl.trim()) {
      this.identityImageUrl = identityImageUrl
        .split(' - ')
        .map((s) => s.trim());
    } else {
      this.identityImageUrl = [];
    }
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default UserInforDetailResponse;
