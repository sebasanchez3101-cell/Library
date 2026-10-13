import { Router } from "express";
import authorRoutes from "../../modules/author/author.routes";
import bookRoutes from "../../modules/book/book.routes";
import genresRoutes from "../../modules/genres/genres.routes";
import loanRoutes from "../../modules/loan/loan.routes";
const router = Router();

router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
router.use("/loans", loanRoutes);
router.use("/genres", genresRoutes);

export default router;