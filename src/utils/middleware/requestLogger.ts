
import { Request, Response, NextFunction } from "express";
import log from "../logger.ts";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const ms = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);

    log.info(
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        responseTime: `${ms}ms`,
        success: res.statusCode < 400,
      },
      `${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`
    );
  });

  next();
}
