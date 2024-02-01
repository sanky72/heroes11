import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { specs, swaggerConfig } from "../../config/index.js";
import contest from "./contest.js";
import match from "./match.js";
import user from "./user.js";
import payment from "./payment.js";
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use("/user", user);
router.use("/contest", contest);
router.use("/match", match);
router.use("/payment", payment);

export default router;
