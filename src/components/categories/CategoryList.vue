<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            Quản lý danh mục
            <v-btn color="primary" @click="dialog = true">
              Thêm danh mục
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-text-field
                v-model="search"
                label="Tìm kiếm danh mục"
                prepend-inner-icon="mdi-magnify"
                single-line
                hide-details
                class="mb-4"
            ></v-text-field>

            <v-table>
              <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Số sản phẩm</th>
                <th>Thao tác</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="category in filteredCategories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>{{ getProductCount(category.id) }}</td>
                <td>
                  <v-btn icon="mdi-pencil" size="small" @click="editCategory(category)"></v-btn>
                  <v-btn
                      icon="mdi-delete"
                      size="small"
                      color="error"
                      @click="confirmDelete(category)"
                      :disabled="hasProducts(category.id)"
                  ></v-btn>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <category-form
          :category="editedCategory"
          @save="saveCategory"
          @close="closeDialog"
      />
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Xác nhận xóa</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn xóa danh mục này?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Hủy</v-btn>
          <v-btn color="error" @click="deleteCategory">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocalStorage } from '../../composables/useLocalStorage'
import { useNotification } from '../../composables/useNotification'
import type { Category, Product } from '../../types'
import CategoryForm from './CategoryForm.vue'

const categories = useLocalStorage<Category[]>('categories', [])
const products = useLocalStorage<Product[]>('products', [])
const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const editedCategory = ref<Category | null>(null)
const categoryToDelete = ref<Category | null>(null)
const { showNotification } = useNotification()

const filteredCategories = computed(() => {
  return categories.value.filter(category =>
      category.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

function getProductCount(categoryId: number): number {
  return products.value.filter(product => product.categoryId === categoryId).length
}

function hasProducts(categoryId: number): boolean {
  return getProductCount(categoryId) > 0
}

function editCategory(category: Category) {
  editedCategory.value = { ...category }
  dialog.value = true
}

function confirmDelete(category: Category) {
  categoryToDelete.value = category
  deleteDialog.value = true
}

function deleteCategory() {
  if (categoryToDelete.value) {
    const index = categories.value.findIndex(c => c.id === categoryToDelete.value?.id)
    if (index > -1) {
      categories.value.splice(index, 1)
      showNotification('Xóa danh mục thành công', 'success')
    }
  }
  deleteDialog.value = false
  categoryToDelete.value = null
}

function saveCategory(category: Category) {
  if (category.id) {
    const index = categories.value.findIndex(c => c.id === category.id)
    categories.value[index] = category
    showNotification('Cập nhật danh mục thành công', 'success')
  } else {
    category.id = Date.now()
    categories.value.push(category)
    showNotification('Thêm danh mục thành công', 'success')
  }
  closeDialog()
}

function closeDialog() {
  dialog.value = false
  editedCategory.value = null
}
</script>