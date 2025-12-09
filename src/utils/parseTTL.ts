export function parseTTL(ttl: string): number {
  const value = parseInt(ttl);              
  const unit = ttl.replace(/[0-9]/g, "");   

  switch (unit) {
    case "s": return value * 1000;                          // seconds
    case "m": return value * 60 * 1000;                     // minutes
    case "h": return value * 60 * 60 * 1000;                // hours
    case "d": return value * 24 * 60 * 60 * 1000;           // days
    case "w": return value * 7 * 24 * 60 * 60 * 1000;       // weeks
    case "y": return value * 365 * 24 * 60 * 60 * 1000;     // years
    default:
      throw new Error(`Invalid TTL format: ${ttl}`);
  }
}
