import { Router } from "express";
import type { Request, Response } from "express";

import Tour from "../db/models/Tour.js";
import { CheckoutService } from "../services/CheckoutService.js";

const router = Router();

router.post(
  "/",
  async (
    req: Request<
      unknown,
      unknown,
      { tripId: string; userId: string; addOnIds: string[] }
    >,
    res: Response
  ) => {
    const { addOnIds, tripId, userId } = req.body;
    const transaction = await Tour.sequelize?.transaction()!;

    try {
      const response = await CheckoutService.create({
        addOnIds,
        transaction,
        tripId,
        userId,
      });

      await transaction?.commit();

      res.send(response);
    } catch (err) {
      await transaction?.rollback();

      console.error(err);
      res.status(422).send({
        error: err instanceof Error ? err.name : err,
        message:
          err instanceof Error ? err.message : "Unexpected error has occured",
      });
    }
  }
);

export default router;
