<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
            prepend-icon="mdi-home"
            title="Trang chủ"
            value="home"
            to="/"
        ></v-list-item>

        <v-list-item
            prepend-icon="mdi-tag-multiple"
            title="Quản lý sản phẩm"
            value="products"
            to="/products"
        ></v-list-item>

        <v-list-item
            prepend-icon="mdi-shape"
            title="Quản lý danh mục"
            value="categories"
            to="/categories"
        ></v-list-item>

        <v-list-item
            prepend-icon="mdi-domain"
            title="Quản lý thương hiệu"
            value="brands"
            to="/brands"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Quản lý cửa hàng</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-snackbar
        v-model="notification.show"
        :color="notification.color"
        :timeout="3000"
    >
      {{ notification.message }}
      <template v-slot:actions>
        <v-btn
            variant="text"
            @click="notification.show = false"
        >
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNotification } from '../src/composables/useNotification.ts'
import { useBrandStore } from '../src/store/brands.ts'
import { useCategoryStore } from '../src/store/categories'
import { useProductStore } from '../src/store/products'

const drawer = ref(true)
const notification = useNotification()

const brandStore = useBrandStore()
const categoryStore = useCategoryStore()
const productStore = useProductStore()

onMounted(() => {
  // Load initial data
  brandStore.loadBrands()
  categoryStore.loadCategories()
  productStore.loadProducts()
})
</script>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>