export interface Brand {
    id: number
    name: string
    description?: string
}

export interface Category {
    id: number
    name: string
    description?: string
}

export interface Product {
    id: number
    name: string
    description?: string
    price: number
    imageUrl?: string
    brandId: number
    categoryId: number
    status: 'in_stock' | 'out_of_stock'
    stock: number
    sku: string
}