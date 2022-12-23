class VideoResponse {
  constructor({
    id,
    description,
    duration,
    thumbnailUrl,
    title,
    url,
    isLock,
    totalView,
    totalComment,
    createdAt,
    updatedAt,
    sectionId,
    userId,
  }) {
    this.id = id;
    this.description = description;
    this.duration = duration;
    this.thumbnailUrl = thumbnailUrl;
    this.title = title;
    this.url = url;
    this.isLock = isLock;
    this.totalView = totalView || 0;
    this.totalComment = totalComment || 0;
    this.sectionId = sectionId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default VideoResponse;
