import { Router } from "express";
import UserController from "../Controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  //Get all users
  router.get("/", [], UserController.index);

  // Get one user
  router.get("/:id([0-9]+)", [], UserController.show);

  // Store user
  router.post("/", [], UserController.store);

  //Edit one user
  router.patch("/:id([0-9]+)", [checkJwt], UserController.update);

  //Delete one user
  router.delete("/:id([0-9]+)", [checkJwt], UserController.destroy);

export default router;