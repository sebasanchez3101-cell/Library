import { Router } from "express";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";
import { AuthorController } from "./author.controller";

const router = Router();
const controller = new AuthorController();


router.post("/", asyncHandler(controller.create));

router.get("/", asyncHandler(controller.findAll));

router.get("/:id", asyncHandler(controller.findById));

router.get("/:id/books", asyncHandler(controller.findBooksByAuthor));

router.put("/:id", asyncHandler(controller.update));

router.delete("/:id", asyncHandler(controller.delete));

export default router;