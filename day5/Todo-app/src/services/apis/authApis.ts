import { StorageKeys } from "../../common/storage_keys.constants";
import { getJSON } from "../../utils/JSONStorage";

export const authApis = {
    login: async (username: string, password: string) => {
        try {
            const userInfo = await getJSON(StorageKeys.USER_INFO);
            if (userInfo && userInfo.username === username && userInfo.password === password) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    },
}