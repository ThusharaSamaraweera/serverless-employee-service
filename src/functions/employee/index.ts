import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";

const create = {
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

const fetch = {
  handler: `${handlerPath(__dirname)}/create.main`,
  events: [
    {
      http: {
        method: "get",
        path: "employees/{id}",
      },
    },
  ],
};

export {create, fetch};
