<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            Quản lý thương hiệu
            <v-btn color="primary" @click="dialog = true">
              Thêm thương hiệu
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-text-field
                v-model="search"
                label="Tìm kiếm thương hiệu"
                prepend-inner-icon="mdi-magnify"
                single-line
                hide-details
            ></v-text-field>

            <v-table>
              <thead>
              <tr>
                <th>Tên thương hiệu</th>
                <th>Mô tả</th>
                <th>Thao tác</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="brand in filteredBrands" :key="brand.id">
                <td>{{ brand.name }}</td>
                <td>{{ brand.description }}</td>
                <td>
                  <v-btn icon="mdi-pencil" size="small" @click="editBrand(brand)"></v-btn>
                  <v-btn icon="mdi-delete" size="small" color="error" @click="confirmDelete(brand)"></v-btn>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <brand-form
          :brand="editedBrand"
          @save="saveBrand"
          @close="closeDialog"
      />
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Xác nhận xóa</v-card-title>
        <v-card-text>
          Bạn có chắc chắn muốn xóa thương hiệu này?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Hủy</v-btn>
          <v-btn color="error" @click="deleteBrand">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocalStorage } from '../../composables/useLocalStorage'
import { useNotification } from '../../composables/useNotification'
import type { Brand } from '../../types'
import BrandForm from './BrandForm.vue'

const brands = useLocalStorage<Brand[]>('brands', [])
const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const editedBrand = ref<Brand | null>(null)
const brandToDelete = ref<Brand | null>(null)
const { showNotification } = useNotification()

const filteredBrands = computed(() => {
  return brands.value.filter(brand =>
      brand.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

function editBrand(brand: Brand) {
  editedBrand.value = { ...brand }
  dialog.value = true
}

function confirmDelete(brand: Brand) {
  brandToDelete.value = brand
  deleteDialog.value = true
}

function deleteBrand() {
  if (brandToDelete.value) {
    const index = brands.value.findIndex(b => b.id === brandToDelete.value?.id)
    if (index > -1) {
      brands.value.splice(index, 1)
      showNotification('Xóa thương hiệu thành công', 'success')
    }
  }
  deleteDialog.value = false
  brandToDelete.value = null
}

function saveBrand(brand: Brand) {
  if (brand.id) {
    const index = brands.value.findIndex(b => b.id === brand.id)
    brands.value[index] = brand
    showNotification('Cập nhật thương hiệu thành công', 'success')
  } else {
    brand.id = Date.now()
    brands.value.push(brand)
    showNotification('Thêm thương hiệu thành công', 'success')
  }
  closeDialog()
}

function closeDialog() {
  dialog.value = false
  editedBrand.value = null
}
</script>