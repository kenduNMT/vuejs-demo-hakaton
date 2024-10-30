<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            Quản lý sản phẩm
            <v-btn color="primary" @click="dialog = true">
              Thêm sản phẩm
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                    v-model="filters.search"
                    label="Tìm kiếm sản phẩm"
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    class="mb-4"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                    v-model="filters.brandId"
                    :items="brands"
                    item-title="name"
                    item-value="id"
                    label="Thương hiệu"
                    hide-details
                    clearable
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                    v-model="filters.categoryId"
                    :items="categories"
                    item-title="name"
                    item-value="id"
                    label="Danh mục"
                    hide-details
                    clearable
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                    v-model="filters.status"
                    :items="statusOptions"
                    label="Trạng thái"
                    hide-details
                    clearable
                ></v-select>
              </v-col>
            </v-row>

            <v-table class="mt-4">
              <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Thương hiệu</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in filteredProducts" :key="product.id">
                <td>
                  <v-img
                      :src="product.imageUrl || '/placeholder.png'"
                      width="50"
                      height="50"
                      cover
                  ></v-img>
                </td>
                <td>{{ product.name }}</td>
                <td>{{ getBrandName(product.brandId) }}</td>
                <td>{{ getCategoryName(product.categoryId) }}</td>
                <td>{{ formatPrice(product.price) }}</td>
                <td>
                  <v-chip
                      :color="product.status === 'in_stock' ? 'success' : 'error'"
                      size="small"
                  >
                    {{ product.status === 'in_stock' ? 'Còn hàng' : 'Hết hàng' }}
                  </v-chip>
                </td>
                <td>
                  <v-btn icon="mdi-pencil" size="small" @click="editProduct(product)"></v-btn>
                  <v-btn icon="mdi-delete" size="small" color="error" @click="confirmDelete(product)"></v-btn>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="800px">
      <product-form
          :product="editedProduct"
          :brands="brands"
          :categories="categories"
          @save="saveProduct"
          @close="closeDialog"
      />
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Xác nhận xóa</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn xóa sản phẩm này?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Hủy</v-btn>
          <v-btn color="error" @click="deleteProduct">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocalStorage } from '../../composables/useLocalStorage'
import { useNotification } from '../../composables/useNotification'
import type { Product, Brand, Category } from '../../types'
import ProductForm from './ProductForm.vue'

// State
const products = useLocalStorage<Product[]>('products', [])
const brands = useLocalStorage<Brand[]>('brands', [])
const categories = useLocalStorage<Category[]>('categories', [])

const dialog = ref(false)
const deleteDialog = ref(false)
const editedProduct = ref<Product | null>(null)
const productToDelete = ref<Product | null>(null)
const { showNotification } = useNotification()

const filters = ref({
  search: '',
  brandId: null as number | null,
  categoryId: null as number | null,
  status: null as string | null
})

const statusOptions = [
  { title: 'Còn hàng', value: 'in_stock' },
  { title: 'Hết hàng', value: 'out_of_stock' }
]

// Computed
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(filters.value.search.toLowerCase())
    const matchesBrand = !filters.value.brandId || product.brandId === filters.value.brandId
    const matchesCategory = !filters.value.categoryId || product.categoryId === filters.value.categoryId
    const matchesStatus = !filters.value.status || product.status === filters.value.status

    return matchesSearch && matchesBrand && matchesCategory && matchesStatus
  })
})

// Methods
function getBrandName(brandId: number): string {
  return brands.value.find(b => b.id === brandId)?.name || ''
}

function getCategoryName(categoryId: number): string {
  return categories.value.find(c => c.id === categoryId)?.name || ''
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

function editProduct(product: Product) {
  editedProduct.value = { ...product }
  dialog.value = true
}

function confirmDelete(product: Product) {
  productToDelete.value = product
  deleteDialog.value = true
}

function closeDialog() {
  dialog.value = false
  editedProduct.value = null
}

function saveProduct(product: Product) {
  // Nếu là sửa sản phẩm
  if (product.id) {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index !== -1) {
      products.value[index] = product
      showNotification('Cập nhật sản phẩm thành công', 'success')
    }
  }
  // Nếu là thêm sản phẩm mới
  else {
    const newProduct = {
      ...product,
      id: Date.now() // Tạo ID tạm thời
    }
    products.value.push(newProduct)
    showNotification('Thêm sản phẩm thành công', 'success')
  }

  closeDialog()
}

function deleteProduct() {
  if (productToDelete.value) {
    const index = products.value.findIndex(p => p.id === productToDelete.value?.id)
    if (index !== -1) {
      products.value.splice(index, 1)
      showNotification('Xóa sản phẩm thành công', 'success')
    }
  }
  deleteDialog.value = false
  productToDelete.value = null
}
</script>

<style scoped>
.v-table {
  width: 100%;
  border-collapse: collapse;
}

.v-table th,
.v-table td {
  padding: 12px;
  text-align: left;
}

.v-table thead {
  background-color: #f5f5f5;
}

.v-table tbody tr:hover {
  background-color: #f9f9f9;
}
</style>