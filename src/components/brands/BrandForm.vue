<template>
  <v-card>
    <v-card-title>
      {{ brand ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu mới' }}
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="save">
        <v-text-field
            v-model="formData.name"
            label="Tên thương hiệu"
            :rules="nameRules"
            required
        ></v-text-field>

        <v-textarea
            v-model="formData.description"
            label="Mô tả"
            :rules="descriptionRules"
            rows="3"
        ></v-textarea>

        <v-file-input
            v-model="logoFile"
            label="Logo"
            accept="image/*"
            :show-size="true"
            @change="handleLogoUpload"
        ></v-file-input>
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
import type { Brand } from '../../types'

interface Props {
  brand: Brand | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'save', brand: Brand): void
  (e: 'close'): void
}>()

const form = ref<any>(null)
const valid = ref(false)
const logoFile = ref<File | null>(null)

const formData = ref<Omit<Brand, 'id'>>({
  name: '',
  description: '',
  logo: ''
})

const nameRules = [
  (v: string) => !!v || 'Tên thương hiệu không được để trống',
  (v: string) => v.length <= 50 || 'Tên thương hiệu không được quá 50 ký tự'
]

const descriptionRules = [
  (v: string) => v.length <= 500 || 'Mô tả không được quá 500 ký tự'
]

onMounted(() => {
  if (props.brand) {
    formData.value = { ...props.brand }
  }
})

async function handleLogoUpload(file: File | null) {
  if (file) {
    // Convert file to base64 for storage
    // In a real app, you would upload to a server
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.logo = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function save() {
  if (form.value?.validate()) {
    emit('save', {
      id: props.brand?.id || 0,
      ...formData.value
    })
  }
}
</script>