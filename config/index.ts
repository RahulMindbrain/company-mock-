import dev from "./dev.config.ts";
import prod from "./prod.config.ts";
import test from "./stag.config.ts";

const env = process.env.NODE_ENV || "development";

const configMap: Record<string, any> = {
  development: dev,
  production: prod,
  test: test,
};

export default configMap[env];
