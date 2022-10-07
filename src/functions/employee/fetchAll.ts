import { successResponse } from "@libs/api-gateway";
import { Employee } from "src/entities/employee.entity"
import { fetchAll } from "./employee-service"

const fetchAllEmployee = async (event) => {
  const employees: Employee[] = await fetchAll();

  return successResponse({
    employees
  })
}

export const main = fetchAllEmployee;