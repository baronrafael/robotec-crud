import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  //Get all users
  router.get("/users", [checkJwt], UserController.index);

  // Get one user
  router.get("/users/:id([0-9]+)", [checkJwt], UserController.show);

  // Store user
  router.post("/users", [checkJwt], UserController.store);

  //Edit one user
  router.patch("/users/:id([0-9]+)", [checkJwt], UserController.update);

  //Delete one user
  router.delete("/users/:id([0-9]+)", [checkJwt], UserController.destroy);

export default router;