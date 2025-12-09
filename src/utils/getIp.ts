import { Request } from "express";

export function getIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    const parts = forwarded.split(",");
    const ip = parts[0];
    return typeof ip === "string" ? ip.trim() : "";
  }

  if (Array.isArray(forwarded)) {
    const ip = forwarded[0];
    return typeof ip === "string" ? ip.trim() : "";
  }

  return req.socket?.remoteAddress ?? "";
}
