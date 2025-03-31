import { employeeApis } from "./employeeApis";

export const authApis = {
    login: async (id: string, password: string) => {
        try {
            const response = await employeeApis.getEmployeeById(Number(id));
            if (response) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    },
}