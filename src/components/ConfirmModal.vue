<script setup>
import { Modal } from 'bootstrap'
import { ref, onMounted } from 'vue'
import { useDefaultStore } from '../stores/default'
import { useRouter } from 'vue-router'

const defaultStore = useDefaultStore()

const modalElement = ref()

const router = useRouter()

onMounted(() => {
  defaultStore.confirmModal = new Modal(modalElement.value)
})

function cancel() {
  defaultStore.confirmModal.hide()
}

function confirm() {
  defaultStore.confirmModal.hide()
  router.push('/result')
}
</script>
<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="confirmLabel"
    aria-hidden="true"
    ref="modalElement"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="my-5 text-center">
            <p class="confirm">ยืนยันข้อมูล</p>
          </div>
          <div class="d-flex justify-content-between">
            <button type="button" class="btn button-cancel shadow" @click="cancel">ยกเลิก</button>
            <button type="button" class="btn button-confirm shadow" @click="confirm">
              ตรวจสอบ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm {
  font-weight: 800;
  font-size: 22px;
}
.button-cancel {
  background-color: #ff0000;
  color: #ffffff;
  border-color: #ff0000;
}
.button-confirm {
  background-color: #4154f1;
  color: #ffffff;
  border-color: #4154f1;
}
</style>
