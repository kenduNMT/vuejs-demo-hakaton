import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Brand } from '../types'

export const useBrandStore = defineStore('brands', () => {
    const brands = ref<Brand[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Getters
    const getBrandById = computed(() => {
        return (id: number) => brands.value.find(brand => brand.id === id)
    })

    const sortedBrands = computed(() => {
        return [...brands.value].sort((a, b) => a.name.localeCompare(b.name))
    })

    // Actions
    function addBrand(brand: Omit<Brand, 'id'>) {
        const newBrand: Brand = {
            id: Date.now(),
            ...brand
        }
        brands.value.push(newBrand)
    }

    function updateBrand(id: number, updatedBrand: Partial<Brand>) {
        const index = brands.value.findIndex(brand => brand.id === id)
        if (index !== -1) {
            brands.value[index] = { ...brands.value[index], ...updatedBrand }
        }
    }

    function deleteBrand(id: number) {
        const index = brands.value.findIndex(brand => brand.id === id)
        if (index !== -1) {
            brands.value.splice(index, 1)
        }
    }

    // Load brands from localStorage on initialization
    function loadBrands() {
        try {
            const savedBrands = localStorage.getItem('brands')
            if (savedBrands) {
                brands.value = JSON.parse(savedBrands)
            }
        } catch (err) {
            error.value = 'Failed to load brands from storage'
        }
    }

    // Save brands to localStorage whenever they change
    function saveBrands() {
        try {
            localStorage.setItem('brands', JSON.stringify(brands.value))
        } catch (err) {
            error.value = 'Failed to save brands to storage'
        }
    }

    return {
        brands,
        loading,
        error,
        getBrandById,
        sortedBrands,
        addBrand,
        updateBrand,
        deleteBrand,
        loadBrands,
        saveBrands
    }
})