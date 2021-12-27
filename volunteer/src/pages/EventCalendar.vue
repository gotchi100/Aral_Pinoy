<template>
  <div>
    <b-calendar block locale="en-US"> <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button></b-calendar>
  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      Using <code>$bvModal</code> Methods
    </template>
    <div class="d-block text-center">
      <h3>Hello From This Modal!</h3>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
  </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    // 15th two months prior
    const minDate = new Date(today)
    minDate.setMonth(minDate.getMonth() - 2)
    minDate.setDate(15)
    // 15th in two months
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 2)
    maxDate.setDate(15)
    return {
      value: '',
      min: minDate,
      max: maxDate
    }
  }
}
</script>
