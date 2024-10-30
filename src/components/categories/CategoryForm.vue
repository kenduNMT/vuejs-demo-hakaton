// components/categories/CategoryForm.vue
<template>
  <v-card>
    <v-card-title>
      {{ category ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới' }}
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="save">
        <v-text-field
            v-model="formData.name"
            label="Tên danh mục"
            :rules="nameRules"
            required
        ></v-text-field>

        <v-textarea
            v-model="formData.description"
            label="Mô tả"
            :rules="descriptionRules"
            rows="3"
        ></v-textarea>
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
import type { Category } from '../../types'

interface Props {
  category: Category | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'save', category: Category): void
  (e: 'close'): void
}>()

const form = ref<any>(null)
const valid = ref(false)

const formData = ref<Omit<Category, 'id'>>({
  name: '',
  description: ''
})

const nameRules = [
  (v: string) => !!v || 'Tên danh mục không được để trống',
  (v: string) => v.length <= 50 || 'Tên danh mục không được quá 50 ký tự'
]

const descriptionRules = [
  (v: string) => v.length <= 500 || 'Mô tả không được quá 500 ký tự'
]

onMounted(() => {
  if (props.category) {
    formData.value = { ...props.category }
  }
})

function save() {
  if (form.value?.validate()) {
    emit('save', {
      id: props.category?.id || 0,
      ...formData.value
    })
  }
}
</script>