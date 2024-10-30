import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '../types'

export const useProductStore = defineStore('products', () => {
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Getters
    const getProductById = computed(() => {
        return (id: number) => products.value.find(product => product.id === id)
    })

    const getProductsByCategory = computed(() => {
        return (categoryId: number) => products.value.filter(product => product.categoryId === categoryId)
    })

    const getProductsByBrand = computed(() => {
        return (brandId: number) => products.value.filter(product => product.brandId === brandId)
    })

    // Actions
    function addProduct(product: Omit<Product, 'id'>) {
        const newProduct: Product = {
            id: Date.now(),
            ...product
        }
        products.value.push(newProduct)
        saveProducts()
    }

    function updateProduct(id: number, updatedProduct: Partial<Product>) {
        const index = products.value.findIndex(product => product.id === id)
        if (index !== -1) {
            products.value[index] = { ...products.value[index], ...updatedProduct }
            saveProducts()
        }
    }

    function deleteProduct(id: number) {
        const index = products.value.findIndex(product => product.id === id)
        if (index !== -1) {
            products.value.splice(index, 1)
            saveProducts()
        }
    }

    function loadProducts() {
        try {
            const savedProducts = localStorage.getItem('products')
            if (savedProducts) {
                products.value = JSON.parse(savedProducts)
            }
        } catch (err) {
            error.value = 'Failed to load products from storage'
        }
    }

    function saveProducts() {
        try {
            localStorage.setItem('products', JSON.stringify(products.value))
        } catch (err) {
            error.value = 'Failed to save products to storage'
        }
    }

    return {
        products,
        loading,
        error,
        getProductById,
        getProductsByCategory,
        getProductsByBrand,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProducts,
        saveProducts
    }
})