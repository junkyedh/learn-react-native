import { useEffect } from "react"
import { getJSON, setJSON } from "../utils/JSONStorage"

function useInitAppStorage<T>(key: string, defaultValue: T) {
    useEffect(() => {
        const initAppStorage = async () => {
            const value = await getJSON(key)
            if (!value) {
                await setJSON(key, defaultValue)
            }
        }

        initAppStorage()
    }, [])
}

export default useInitAppStorage