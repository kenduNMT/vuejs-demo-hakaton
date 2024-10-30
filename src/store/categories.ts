import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '../types'

export const useCategoryStore = defineStore('categories', () => {
    const categories = ref<Category[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Getters
    const getCategoryById = computed(() => {
        return (id: number) => categories.value.find(category => category.id === id)
    })

    const sortedCategories = computed(() => {
        return [...categories.value].sort((a, b) => a.name.localeCompare(b.name))
    })

    // Actions
    function addCategory(category: Omit<Category, 'id'>) {
        const newCategory: Category = {
            id: Date.now(),
            ...category
        }
        categories.value.push(newCategory)
        saveCategories()
    }

    function updateCategory(id: number, updatedCategory: Partial<Category>) {
        const index = categories.value.findIndex(category => category.id === id)
        if (index !== -1) {
            categories.value[index] = { ...categories.value[index], ...updatedCategory }
            saveCategories()
        }
    }

    function deleteCategory(id: number) {
        const index = categories.value.findIndex(category => category.id === id)
        if (index !== -1) {
            categories.value.splice(index, 1)
            saveCategories()
        }
    }

    function loadCategories() {
        try {
            const savedCategories = localStorage.getItem('categories')
            if (savedCategories) {
                categories.value = JSON.parse(savedCategories)
            }
        } catch (err) {
            error.value = 'Failed to load categories from storage'
        }
    }

    function saveCategories() {
        try {
            localStorage.setItem('categories', JSON.stringify(categories.value))
        } catch (err) {
            error.value = 'Failed to save categories to storage'
        }
    }

    return {
        categories,
        loading,
        error,
        getCategoryById,
        sortedCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        loadCategories,
        saveCategories
    }
})