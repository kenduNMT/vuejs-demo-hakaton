<template>
  <v-card>
    <v-card-title>
      {{ product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="save">
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
                v-model="formData.name"
                label="Tên sản phẩm"
                :rules="nameRules"
                required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
                v-model.number="formData.price"
                label="Giá"
                type="number"
                :rules="priceRules"
                required
                prefix="₫"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
                v-model="formData.brandId"
                :items="brands"
                item-title="name"
                item-value="id"
                label="Thương hiệu"
                :rules="brandRules"
                required
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
                v-model="formData.categoryId"
                :items="categories"
                item-title="name"
                item-value="id"
                label="Danh mục"
                :rules="categoryRules"
                required
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
                v-model="formData.imageUrl"
                label="URL hình ảnh"
                :rules="imageUrlRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
                v-model="formData.status"
                :items="statusOptions"
                label="Trạng thái"
                :rules="statusRules"
                required
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-textarea
                v-model="formData.description"
                label="Mô tả"
                :rules="descriptionRules"
                rows="4"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
                v-model.number="formData.stock"
                label="Số lượng tồn kho"
                type="number"
                :rules="stockRules"
                required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
                v-model="formData.sku"
                label="Mã SKU"
                :rules="skuRules"
                required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="save" :disabled="!valid">
        Lưu
      </v-btn>
      <v-btn @click="$emit('close')">
        Hủy
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product, Brand, Category } from '@/types'

interface Props {
  product: Product | null
  brands: Brand[]
  categories: Category[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'save', product: Product): void
  (e: 'close'): void
}>()

const form = ref<any>(null)
const valid = ref(false)

const statusOptions = [
  { title: 'Còn hàng', value: 'in_stock' },
  { title: 'Hết hàng', value: 'out_of_stock' }
]

const formData = ref<Omit<Product, 'id'>>({
  name: '',
  price: 0,
  description: '',
  imageUrl: '',
  brandId: 0,
  categoryId: 0,
  status: 'in_stock',
  stock: 0,
  sku: ''
})

const nameRules = [
  (v: string) => !!v || 'Tên sản phẩm không được để trống',
  (v: string) => v.length <= 100 || 'Tên sản phẩm không được quá 100 ký tự'
]

const priceRules = [
  (v: number) => !!v || 'Giá không được để trống',
  (v: number) => v >= 0 || 'Giá phải lớn hơn hoặc bằng 0',
]

const brandRules = [
  (v: number) => !!v || 'Vui lòng chọn thương hiệu'
]

const categoryRules = [
  (v: number) => !!v || 'Vui lòng chọn danh mục'
]

const imageUrlRules = [
  (v: string) => !v || /^https?:\/\/.+/.test(v) || 'URL hình ảnh không hợp lệ'
]

const statusRules = [
  (v: string) => !!v || 'Vui lòng chọn trạng thái'
]

const descriptionRules = [
  (v: string) => v.length <= 1000 || 'Mô tả không được quá 1000 ký tự'
]

const stockRules = [
  (v: number) => v >= 0 || 'Số lượng tồn kho phải lớn hơn hoặc bằng 0',
  (v: number) => Number.isInteger(v) || 'Số lượng tồn kho phải là số nguyên'
]

const skuRules = [
  (v: string) => !!v || 'Mã SKU không được để trống',
  (v: string) => /^[A-Za-z0-9-]+$/.test(v) || 'Mã SKU chỉ được chứa chữ cái, số và dấu gạch ngang',
  (v: string) => v.length <= 20 || 'Mã SKU không được quá 20 ký tự'
]

onMounted(() => {
  if (props.product) {
    formData.value = { ...props.product }
  }
})

function save() {
  if (form.value?.validate()) {
    emit('save', {
      id: props.product?.id || 0,
      ...formData.value
    })
  }
}
</script>