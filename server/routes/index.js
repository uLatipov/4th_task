import { Router } from "express";
import userController from "../controller/user.controller.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", AuthMiddleware, userController.users);
router.post("/delete", AuthMiddleware, userController.delete);
router.put("/block", AuthMiddleware, userController.block);
router.put("/unblock", AuthMiddleware, userController.unblock);
export default router;
