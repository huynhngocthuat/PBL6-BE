import { categoryTopic, categoryTopicIdExist } from './categoryTopic.schema';
import { emailNotExists, email, emailExists } from './email.schema';
import { register, login, confirmToken, refreshToken } from './auth.schema';
import { course } from './course.schema';
import { section, sectionUpdate } from './section.schema';
import { video } from './video.schema';

export {
  categoryTopic,
  course,
  section,
  sectionUpdate,
  emailNotExists,
  email,
  emailExists,
  video,
  // auth
  register,
  login,
  confirmToken,
  refreshToken,
  categoryTopicIdExist,
  // end auth
};
