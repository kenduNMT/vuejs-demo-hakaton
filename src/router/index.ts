import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BrandList from '../components/brands/BrandList.vue'
import CategoryList from '../components/categories/CategoryList.vue'
import ProductList from '../components/products/ProductList.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/brands',
        name: 'Brands',
        component: BrandList
    },
    {
        path: '/categories',
        name: 'Categories',
        component: CategoryList
    },
    {
        path: '/products',
        name: 'Products',
        component: ProductList
    },
    {
        path: '/',
        redirect: '/products'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router