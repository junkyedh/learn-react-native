import { Employee } from "../../types/employee.types";
import { MainApiRequestPromise, MainApiRequestPromiseCheckStatus } from "../apiInstance";

export type EmployeeDataRequest = Omit<Employee, 'id'>;

export const employeeApis = {
    getEmployeeList: async () => {
        return await MainApiRequestPromise<any, Employee[]>({
            url: '/employees',
            method: 'GET',
        });
    },
    getEmployeeById: async (id: number) => {
        return await MainApiRequestPromise<any, Employee>({
            url: `/employee/${id}`,
            method: 'GET',
        });
    },
    createEmployee: async (employee: EmployeeDataRequest) => {
        return await MainApiRequestPromise<EmployeeDataRequest, Employee>({
            url: '/create',
            method: 'POST',
            body: employee,
        });
    },
    updateEmployee: async (id: number, employee: EmployeeDataRequest) => {
        return await MainApiRequestPromise<EmployeeDataRequest, Employee>({
            url: `/update/${id}`,
            method: 'PUT',
            body: employee,
        });
    },
    deleteEmployee: async (id: number) => {
        return await MainApiRequestPromiseCheckStatus<any>({
            url: `/delete/${id}`,
            method: 'DELETE',
        });
    }
};