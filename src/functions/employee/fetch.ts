import { successResponse } from "@libs/api-gateway";
import { Employee } from "src/entities/employee.entity"
import { fetch } from "./employee-service"

const fetchEmployee = async (event) => {
  const employee: Employee = await fetch(event.path.id);

  return successResponse({
    employee
  })
}

export const main = fetchEmployee;