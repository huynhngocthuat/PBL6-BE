import { categoryTopic, categoryTopicIdExist } from './categoryTopic.schema';
import { emailNotExists, email, emailExists } from './email.schema';
import {
  register,
  login,
  confirmToken,
  refreshToken,
  verifyCode,
  resetPassword,
  changePassword,
} from './auth.schema';
import { course } from './course.schema';
import { section, sectionUpdate } from './section.schema';
import { video, videoIdExist } from './video.schema';
import { avatar, updateProfile, userIdExist } from './user.schema';
import { hashtag } from './hashtag.schema';
import { id } from './common.schema';
import { videoComment } from './videoComment.schema';
import { answerRequest, userRequestIdExist } from './answerRequest.chema';
import { videoView } from './videoView.schema';

export {
  // common
  id,
  // end common
  categoryTopic,
  categoryTopicIdExist,
  course,
  section,
  sectionUpdate,
  emailNotExists,
  email,
  emailExists,
  video,
  videoIdExist,
  videoView,
  hashtag,
  videoComment,
  // auth
  register,
  login,
  confirmToken,
  refreshToken,
  verifyCode,
  resetPassword,
  changePassword,
  // end auth
  // user
  avatar,
  updateProfile,
  userIdExist,
  // end user
  answerRequest,
  userRequestIdExist,
};
