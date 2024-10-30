import { ref } from 'vue'

interface Notification {
    message: string
    type: 'success' | 'error' | 'info'
    timeout?: number
}

export function useNotification() {
    const notification = ref<Notification | null>(null)

    const showNotification = (message: string, type: Notification['type'] = 'info', timeout = 3000) => {
        notification.value = { message, type }
        if (timeout) {
            setTimeout(() => {
                notification.value = null
            }, timeout)
        }
    }

    return {
        notification,
        showNotification
    }
}