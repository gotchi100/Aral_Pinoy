<template>
  <b-modal
    v-model="modal"
    size="xl"
    title="Expired Inventory Items"
    hide-footer
    @hide="$emit('close')"
  >
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-table
            :items="inventoryItems"
            :fields="inventoryItemFields"
            show-empty
            responsive
            striped
            primary-key="name"
          >
            <template #cell(expirationDate)="{ item }">
              {{ new Date(getItemExpirationDate(item)).toLocaleString('en-us', { month: 'short', year: 'numeric' }) }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: 'ExpiredInventoryItemsModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    inventoryItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      modal: false,
      inventoryItemFields: [
        { key: 'name', label: 'Item' },
        { key: 'sku', label: 'SKU' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'expirationDate', label: 'Expiration Date' }
      ]
    }
  },
  watch: {
    show (val) {
      this.modal = val
    }
  },
  methods: {
    getItemExpirationDate (item) {
      return item.category.customFields.expirationDate !== undefined
        ? item.category.customFields.expirationDate
        : item.category.customFields.bestBeforeDate
    }
  }
}
</script>
