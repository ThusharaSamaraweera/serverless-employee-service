import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { successResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { Employee } from "src/entities/employee.entity";
import {create} from "./employee-service";

import schema from "./schema";

const createEmployee: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const employee: Employee = event.body as any as Employee;
  const savedEmployee = await create(employee);

  return successResponse({
    savedEmployee
  });
};

export const main = middyfy(createEmployee);
