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

const fetch = async (employeeId: string): Promise<Employee> => {
  const employeeRepository = await (
    await getDBConnection()
  ).getRepository(Employee);
  const employee: Employee = await employeeRepository
    .findOneBy({id: employeeId})
    .catch((error) => {
      console.error("Failed to fetch employee: ", error);
      throw new Error(error);
    });

  return employee;
};

const fetchAll = async (): Promise<Employee[]> => {
  const employeeRepository = await (
    await getDBConnection()
  ).getRepository(Employee);
  const employees: Employee[] = await employeeRepository
    .find()
    .catch((error) => {
      console.error("Failed to fetch employees: ", error);
      throw new Error(error);
    });

  return employees;
};

export {create, fetch, fetchAll};
