import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const data = ref<T>(JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue)))

    watch(data, (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
    }, { deep: true })

    return data
}