import { getDBConnection } from "@libs/db-manager";
import { Employee } from "src/entities/employee.entity";

const create = async (employee: Employee): Promise<Employee> => {
  const employeeRepository = await (
    await getDBConnection()
  ).getRepository(Employee);
  const newEmployee: Employee = await employeeRepository
    .save(employee)
    .catch((error) => {
      console.error("Failed to create employee: ", error);
      throw new Error(error);
    });

  return newEmployee;
};

export default create;
