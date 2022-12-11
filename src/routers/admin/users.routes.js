import express from 'express';
import { UserController } from 'controllers';

const router = express.Router();

router.get('/', UserController.getUserRoleIsUserOrInstructor);
router.get('/requests', UserController.getRequestsOfUser);

export default router;
