import pino from "pino";
import dayjs from "dayjs";
import config from "../../config";

const isProd = config.MODE === "production";

const log = pino({
  enabled: !isProd,               
  base: { pid: false },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  transport: !isProd
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,                  
});

export default log;
