import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)
dayjs.locale('th')

export const useDefaultStore = defineStore('default', () => {
  const name = ref('')
  const idCard = ref('')
  const gender = ref('')
  const birthDate = ref()
  const confirmModal = ref()

  const thaiBirthDate = computed(() => {
    if (birthDate.value === null || birthDate.value === '' || birthDate.value === undefined) {
      return null
    } else {
      return dayjs(birthDate.value).format('D MMMM BBBB')
    }
  })

  function clear() {
    name.value = ''
    idCard.value = ''
    gender.value = ''
    birthDate.value = ''
  }

  return { name, idCard, gender, birthDate, confirmModal, clear, thaiBirthDate }
})
