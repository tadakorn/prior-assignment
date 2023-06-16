<script setup>
import { useDefaultStore } from '../stores/default'
import { ref } from 'vue'

const defaultStore = useDefaultStore()
const isError = ref({
  name: false,
  idCard: false,
  gender: false,
  birthDate: false
})

function confirm() {
  let isValid = true
  const isThaiEnglishString = /^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(defaultStore.name)
  if (
    defaultStore.name === '' ||
    defaultStore.name === null ||
    defaultStore.name === undefined ||
    !isThaiEnglishString
  ) {
    isError.value.name = true
    isValid = false
  } else {
    isError.value.name = false
  }

  const isIdCardFormatValid = /^(\d{1})-(\d{4})-(\d{5})-(\d{2})-(\d{1})/.test(defaultStore.idCard)
  if (
    defaultStore.idCard === '' ||
    defaultStore.idCard === null ||
    defaultStore.idCard === undefined ||
    !isIdCardFormatValid
  ) {
    isError.value.idCard = true
    isValid = false
  } else {
    isError.value.idCard = false
  }

  if (
    defaultStore.gender === '' ||
    defaultStore.gender === null ||
    defaultStore.gender === undefined
  ) {
    isError.value.gender = true
    isValid = false
  } else {
    isError.value.gender = false
  }

  if (
    defaultStore.birthDate === '' ||
    defaultStore.birthDate === null ||
    defaultStore.birthDate === undefined
  ) {
    isError.value.birthDate = true
    isValid = false
  } else {
    isError.value.birthDate = false
  }

  if (isValid) {
    defaultStore.confirmModal.show()
  }
}

function onNameInput() {
  let lastCharacter = defaultStore.name.slice(-1)
  let charCode = lastCharacter.charCodeAt(0)
  if (
    charCode == 32 ||
    (charCode >= 65 && charCode <= 90) ||
    (charCode >= 97 && charCode <= 122) ||
    (charCode >= 161 && charCode <= 255) ||
    (charCode >= 3585 && charCode <= 3675)
  ) {
    return
  } else {
    defaultStore.name = defaultStore.name.slice(0, -1)
  }
}

function onIdCardInput(e) {
  if (e.inputType === 'deleteContentBackward') {
    if (defaultStore.idCard.slice(-1) === '-') {
      defaultStore.idCard = defaultStore.idCard.slice(0, -1)
    }
  } else {
    const allowCharacters = '0123456789'
    if (allowCharacters.includes(defaultStore.idCard.slice(-1))) {
      let length = defaultStore.idCard.length
      let position = [1, 6, 12, 15]
      if (position.includes(length)) {
        defaultStore.idCard += '-'
      }
    } else {
      defaultStore.idCard = defaultStore.idCard.slice(0, -1)
    }
  }
}
</script>

<template>
  <div>
    <p class="title">กิจกรรมการฉีดวัคซีนป้องกันโควิด 19</p>
  </div>
  <div class="mb-3 rounded rounded-4 p-4 shadow-lg form-home">
    <div class="mt-2">
      <label for="name" class="form-label">ชื่อ-นามสกุล</label>
      <input
        id="name"
        type="text"
        class="form-control"
        v-model="defaultStore.name"
        @input="onNameInput"
      />
      <div class="mt-2">
        <span class="custom-color" v-if="isError.name"><small>กรุณาระบุ ชื่อ-นามสกุล</small></span>
      </div>
    </div>
    <div class="mt-2">
      <label for="idcard" class="form-label">เลขบัตรประชาชน</label>
      <input
        id="idcard"
        type="text"
        class="form-control"
        v-model="defaultStore.idCard"
        :maxlength="17"
        @input="onIdCardInput"
      />
      <div class="mt-2">
        <span class="custom-color" v-if="isError.idCard"
          ><small>กรุณาระบุ เลขบัตรประชาชน</small></span
        >
      </div>
    </div>
    <div class="mt-2">
      <label for="gender" class="form-label">เพศ</label>
      <select
        id="gender"
        class="form-select"
        aria-label="Default select example"
        v-model="defaultStore.gender"
      >
        <option value="">-</option>
        <option value="ชาย">ชาย</option>
        <option value="หญิง">หญิง</option>
      </select>
      <div class="mt-2">
        <span class="custom-color" v-if="isError.gender"><small>กรุณาระบุ เพศ</small></span>
      </div>
    </div>
    <div class="mt-2">
      <label for="date" class="form-label">วัน/เดือน/ปีเกิด</label>
      <VueDatePicker
        id="date"
        v-model="defaultStore.birthDate"
        :enable-time-picker="false"
        auto-apply
        :max-date="new Date()"
      ></VueDatePicker>
      <div class="mt-2">
        <span class="custom-color" v-if="isError.birthDate"
          ><small>กรุณาระบุ วัน/เดือน/ปีเกิด</small></span
        >
      </div>
    </div>
    <div class="d-flex justify-content-between mt-5">
      <button type="button" class="btn button-clear shadow" @click="defaultStore.clear">
        ล้าง
      </button>
      <button type="button" class="btn button-confirm shadow" @click="confirm">ยืนยัน</button>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .title {
    font-size: 22px;
    font-weight: 900;
    text-align: center;
  }
}

/* Media query for devices with a minimum width of 601px and maximum width of 1200px */
@media (min-width: 601px) and (max-width: 1200px) {
  .title {
    font-size: 25px;
    font-weight: 900;
    text-align: center;
  }
}

/* Media query for devices with a minimum width of 1201px */
@media (min-width: 1201px) {
  .title {
    font-size: 30px;
    font-weight: 900;
    text-align: center;
  }
}
.form-home {
  background-color: #fff;
}

@media (max-width: 600px) {
  .form-label {
    font-weight: 800;
    font-size: 16px;
  }
}

@media (min-width: 601px) and (max-width: 1200px) {
  .form-label {
    font-weight: 800;
    font-size: 18px;
  }
}

@media (min-width: 1201px) {
  .form-label {
    font-weight: 800;
    font-size: 20px;
  }
}
.button-clear {
  background-color: #ff0000;
  color: #ffffff;
  border-color: #ff0000;
}
.button-confirm {
  background-color: #4154f1;
  color: #ffffff;
  border-color: #4154f1;
}
.custom-color {
  color: #ff0000;
}
</style>
