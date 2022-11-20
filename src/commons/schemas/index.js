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
import { video } from './video.schema';
import { avatar, updateProfile } from './user.schema';
import { hashtag } from './hashtag.schema';
import { id } from './common.schema';

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
  hashtag,
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
  // end user
};
