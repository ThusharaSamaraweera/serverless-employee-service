import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/create.main`,
  events: [
    {
      http: {
        method: "post",
        path: "employees",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
