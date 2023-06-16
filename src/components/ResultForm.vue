<script setup>
import { useDefaultStore } from '../stores/default'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)
dayjs.locale('th')

const router = useRouter()
const defaultStore = useDefaultStore()
const canTakeVaccine = ref(null)
const errorMessage = ref('')

function checkAge() {
  let birthDate = dayjs(defaultStore.birthDate)
  let ageMonth = dayjs().diff(birthDate, 'month')

  if (ageMonth < 6) {
    canTakeVaccine.value = false
    let targetAge = birthDate.add(6 - ageMonth, 'month')
    errorMessage.value = `อายุจะครบ 6 เดือน วันที่ ${targetAge.format('D')} ${targetAge.format(
      'MMMM'
    )} พ.ศ. ${targetAge.format('BBBB')}`
  } else if (ageMonth > 24 && ageMonth < 780) {
    canTakeVaccine.value = false
    let targetAge = birthDate.add(780 - ageMonth, 'month')
    errorMessage.value = `อายุจะครบ 65 ปี วันที่ ${targetAge.format('D')} ${targetAge.format(
      'MMMM'
    )} พ.ศ. ${targetAge.format('BBBB')}`
  } else {
    canTakeVaccine.value = true
  }
}

onMounted(() => {
  let today = dayjs()
  if (today >= dayjs('2023-06-01') && today <= dayjs('2023-08-31')) {
    checkAge()
  } else {
    canTakeVaccine.value = false
    errorMessage.value = 'มารับบริการไม่ตรงช่วงเวลาที่มีสิทธิ์'
  }
})
function homeForm() {
  defaultStore.clear()
  router.push('/')
}
</script>

<template>
  <div class="info">
    <p>ชื่อ-นามสกุล : {{ defaultStore.name }}</p>
  </div>
  <div class="info">
    <p>เลขบัตรประชาชน : {{ defaultStore.idCard }}</p>
  </div>
  <div class="info">
    <p>เพศ : {{ defaultStore.gender }}</p>
  </div>
  <div class="info">
    <p :format="defaultStore.thaiBirthDate">วัน/เดือน/ปีเกิด : {{ defaultStore.thaiBirthDate }}</p>
  </div>

  <div class="info">
    <div v-if="canTakeVaccine">
      สถานะเข้ารับบริการ : <span class="text-success">สามารถเข้ารับบริการได้</span>
    </div>
    <div v-else>
      สถานะเข้ารับบริการ : <span class="text-danger">ไม่สามารถเข้ารับบริการได้</span
      ><span> เนื่องจาก{{ errorMessage }}</span>
    </div>
  </div>
  <div class="text-end pt-4 info">
    <button type="button" class="btn btn-secondary shadow" @click="homeForm">ย้อนกลับ</button>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .info {
    font-weight: 800;
    font-size: 14px;
  }
}

@media (min-width: 601px) and (max-width: 1200px) {
  .info {
    font-weight: 800;
    font-size: 18px;
  }
}

@media (min-width: 1201px) {
  .info {
    font-weight: 800;
    font-size: 20px;
  }
}
</style>
