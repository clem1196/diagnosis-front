<template>
  <div>
    <button id="delete" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="@mdo"
      hidden></button>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete</h5>
            <RouterLink to="/diagnosis" class="btn btn-close"></RouterLink>
          </div>
          <div class="modal-body">
            {{ title }}
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger btn-sm" @click="_deleteDiagnosis">Yes</button>

            <RouterLink :to="path" class="btn btn-light btn-sm">No</RouterLink>
          </div>
        </div>
        <p v-if="message.success" class="alert alert-success mt-2" role="alert">
          <i class="bi-check-circle-fill m-1"></i>{{ message.success }}
        </p>
        <p v-if="message.err" class="alert alert-danger mt-2">
          <i class="bi-exclamation-triangle-fill m-1"></i>{{ message.err }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { deleteDiagnosis } from '@/data/diagnosis'
import router from '@/router'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route: any = useRoute()
const title = ref('Do you really want to delete this?')
let path = ref('')
const message = reactive({
  success: '',
  err: ''
})
onMounted(() => {
  doClick()
  const p = route.path.split('/delete')
  path.value = p[0]
  console.log(route)
  console.log(route.params.id)
})
const doClick = () => {
  const del: HTMLElement | null = document.getElementById('delete')
  if (del !== null) {
    del.click()
  }
}
const _deleteDiagnosis = async () => {
  try {
    let deleteName = route.name

    if (deleteName === 'diagnosisDelete') {
      let res = await deleteDiagnosis(route.params.id)
      if (res?.statusText == 'OK') {
        message.success = res.data.Message
        message.err = ''
        router.back()
      }
    }
  } catch (error: any) {
    message.err = error.response.data.Message
    message.success = ''
    console.log(error.response.data.Message)
  }
}
</script>
<style></style>
