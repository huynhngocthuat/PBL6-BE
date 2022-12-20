import express from 'express';
import { UserController } from 'controllers';

const router = express.Router();

router.get('/', UserController.getUserRoleIsUserOrInstructor);
router.get('/requests', UserController.getRequestsOfUser);
router.get('/search', UserController.searchUser);

export default router;
