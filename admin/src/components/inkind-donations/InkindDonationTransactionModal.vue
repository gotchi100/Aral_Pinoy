<template>
  <b-modal
    v-model="modal"
    size="xl"
    hide-footer
    @hide="$emit('close')"
  >
    <b-overlay
      :show="isLoading"
      rounded="sm"
    >
      <div>
        <b-row>
          <b-col cols="12">
            <h1
              style="font-family:'Bebas Neue', cursive;"
              no-body
              class="text-center"
            >
              Enter a Transaction
            </h1>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            cols="12"
            class="text-center"
          >
            <b-form-select
              v-model="transactionChoice"
              :options="transactionChoices"
            />
          </b-col>
        </b-row>

        <b-row
          v-if="transactionChoice === 'send-donation'"
          class="pt-3"
        >
          <b-col cols="12">
            <b-card>
              <b-container fluid>
                <b-row>
                  <b-col cols="12">
                    <h1
                      style="font-family:'Bebas Neue', cursive;"
                      no-body
                      class="text-center"
                    >
                      Send an In-Kind Donation to an Organization
                    </h1>
                  </b-col>
                </b-row>

                <b-row class="pt-3">
                  <b-col cols="12">
                    <label for="outbound-transaction-receiver-org-name">
                      Organization Name
                    </label>

                    <b-dropdown
                      :text="outboundTransactionForm.receiver.organization.name || 'Select an Organization'"
                      style="width: 100%"
                      menu-class="w-100"
                      variant="outline-primary"
                      :no-caret="!!outboundTransactionForm.receiver.organization.name"
                      no-flip
                    >
                      <b-dropdown-form>
                        <b-form-group
                          label="Search Organization"
                          label-for="outbound-transaction-receiver-org-name"
                          @submit.stop.prevent
                        >
                          <b-form-input
                            id="outbound-transaction-receiver-org-name"
                            v-model="outboundTransactionOrgSearch"
                            debounce="250"
                            @update="searchInkindDonationOrganizations"
                          />
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider />
                      <b-dropdown-item
                        v-for="organization in orgOptions"
                        :key="organization._id"
                        @click="selectOrganization(organization)"
                      >
                        {{ organization.name }}
                      </b-dropdown-item>

                      <b-dropdown-item
                        v-if="outboundTransactionOrgSearch !== '' && !isOrgSearchInOptions()"
                        @click="selectOrganization({ name: outboundTransactionOrgSearch })"
                      >
                        Add `{{ outboundTransactionOrgSearch }}` organization
                      </b-dropdown-item>

                      <b-dropdown-item
                        v-if="outboundTransactionForm.receiver.organization.name !== ''"
                        style="background-color: #f2f2f2"
                        @click="unselectOrganization()"
                      >
                        Unset `{{ outboundTransactionForm.receiver.organization.name }}` organization
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                </b-row>

                <b-row class="pt-3">
                  <b-col cols="12">
                    <b-form-tags>
                      <template>
                        <ul
                          v-if="outboundTransactionForm.receiver.organization.contacts.length > 0"
                          class="list-inline d-inline-block mb-2"
                        >
                          <li
                            v-for="(contact, index) in outboundTransactionForm.receiver.organization.contacts"
                            :key="index"
                            class="list-inline-item"
                          >
                            <b-form-tag
                              class="bg-success"
                              @remove="removeOrgContact(index)"
                            >
                              {{ contact.name }} - {{ contact.contactMethods[0].value }}
                            </b-form-tag>
                          </li>
                        </ul>

                        <b-dropdown
                          ref="orgContactFormDropdown"
                          text="Add Contacts"
                          style="width: 100%"
                          menu-class="w-100"
                          variant="outline-primary"
                          no-flip
                        >
                          <b-dropdown-form>
                            <validation-observer v-slot="{ invalid }">
                              <b-form-group
                                label="Name"
                                label-for="outbound-transaction-receiver-contact-name"
                                @submit.stop.prevent
                              >
                                <validation-provider
                                  v-slot="validationContext"
                                  :rules="{
                                    required: true,
                                    max: 100,
                                    regex: regexRules.filipinoCharacters
                                  }"
                                >
                                  <b-form-input
                                    id="outbound-transaction-receiver-contact-name"
                                    v-model="orgContactForm.name"
                                    :state="getValidationState(validationContext)"
                                    aria-describedby="outbound-transaction-receiver-contact-name-feedback"
                                  />

                                  <b-form-invalid-feedback
                                    v-if="validationContext.failedRules.regex !== undefined"
                                    id="outbound-transaction-receiver-contact-name-feedback"
                                  >
                                    This field does not have a valid format
                                  </b-form-invalid-feedback>

                                  <b-form-invalid-feedback
                                    v-else
                                    id="outbound-transaction-receiver-contact-name-feedback"
                                  >
                                    {{ validationContext.errors[0] }}
                                  </b-form-invalid-feedback>
                                </validation-provider>
                              </b-form-group>

                              <b-form-group
                                class="pt-3"
                                label="Contact Method"
                                label-for="outbound-transaction-receiver-contact-method-type"
                                @submit.stop.prevent
                              >
                                <b-input-group>
                                  <b-form-select
                                    id="outbound-transaction-receiver-contact-method-type"
                                    v-model="orgContactForm.contactMethods[0].type"
                                    style="width: 100%; padding: 0.5rem 0.75rem"
                                    :options="['EMAIL', 'MOBILE']"
                                    size="lg"
                                  />
                                </b-input-group>
                              </b-form-group>

                              <b-form-group
                                class="pt-3"
                                label="Contact Details"
                                label-for="outbound-transaction-receiver-contact-method-value"
                                @submit.stop.prevent
                              >
                                <validation-provider
                                  v-slot="validationContext"
                                  :rules="{
                                    max: 255,
                                    email: orgContactForm.contactMethods[0].type === 'EMAIL',
                                    regex: orgContactForm.contactMethods[0].type === 'MOBILE' ? regexRules.phContactNumber : false
                                  }"
                                >
                                  <b-form-input
                                    id="outbound-transaction-receiver-contact-method-value"
                                    v-model="orgContactForm.contactMethods[0].value"
                                    :state="getValidationState(validationContext)"
                                    aria-describedby="outbound-transaction-receiver-contact-method-value-feedback"
                                  />

                                  <b-form-invalid-feedback
                                    v-if="validationContext.failedRules.regex !== undefined"
                                    id="outbound-transaction-receiver-contact-method-value-feedback"
                                  >
                                    This field must be a valid Philippine mobile number
                                  </b-form-invalid-feedback>

                                  <b-form-invalid-feedback
                                    v-else
                                    id="outbound-transaction-receiver-contact-method-value-feedback"
                                  >
                                    {{ validationContext.errors[0] }}
                                  </b-form-invalid-feedback>
                                </validation-provider>
                              </b-form-group>

                              <b-button
                                class="mt-4"
                                variant="success"
                                :disabled="invalid"
                                @click="addOutboundTransactionContact"
                              >
                                Submit
                              </b-button>
                            </validation-observer>
                          </b-dropdown-form>
                        </b-dropdown>
                      </template>
                    </b-form-tags>
                  </b-col>
                </b-row>

                <b-row class="pt-3">
                  <b-col cols="12">
                    <label for="inventory-adj-date">
                      Date
                    </label>
                    <b-form-datepicker
                      v-model="outboundTransactionForm.date"
                      label="Date"
                      value-as-date
                    />
                  </b-col>
                </b-row>

                <b-row class="pt-3">
                  <b-col cols="12">
                    <label for="inventory-adj-item-name">Item Name</label>
                    <b-dropdown
                      :text="outboundTransactionForm.item ? `${outboundTransactionForm.item.name} - ${outboundTransactionForm.item.sku}` : 'Select an item'"
                      style="width: 100%"
                      menu-class="w-100"
                      variant="outline-primary"
                      :no-caret="!!outboundTransactionForm.item"
                      no-flip
                    >
                      <b-dropdown-form>
                        <b-form-group
                          label="Search Item"
                          label-for="inventory-adj-item-search"
                          @submit.stop.prevent
                        >
                          <b-form-input
                            id="inventory-adj-item-search"
                            debounce="500"
                            @update="searchInkindDonations"
                          />
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider />
                      <b-dropdown-item
                        v-for="item in inkindDonationOptions"
                        :key="item._id"
                        @click="selectOutboundTransactionItem(item)"
                      >
                        {{ item.name }} <span style="color: grey; font-size: 12px">{{ item.sku }}</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-col>
                </b-row>

                <b-row
                  v-if="outboundTransactionForm.item !== null"
                  class="pt-3"
                >
                  <b-col
                    cols="12"
                    md="4"
                  >
                    <label for="inventory-adj-item-quantity">
                      Current Quantity
                    </label>
                    <b-form-input
                      label="inventory-adj-item-quantity"
                      :value="outboundTransactionForm.item.quantity"
                      disabled
                    />
                  </b-col>

                  <b-col
                    cols="12"
                    md="4"
                  >
                    <label for="inventory-adj-item-quantity">
                      How many to donate
                    </label>
                    <b-form-input
                      v-model="outboundTransactionForm.quantity"
                      type="number"
                      label="inventory-adj-item-quantity"
                      :formatter="(value) => {
                        const positiveValue = toPositiveNumber(value)

                        if (positiveValue > outboundTransactionForm.item.quantity) {
                          return outboundTransactionForm.item.quantity
                        }

                        return positiveValue
                      }"
                    />
                  </b-col>

                  <b-col
                    cols="12"
                    md="4"
                  >
                    <label for="inventory-adj-item-quantity">
                      New Quantity
                    </label>
                    <b-form-input
                      label="inventory-adj-item-quantity"
                      :value="Number(outboundTransactionForm.item.quantity) - Number(outboundTransactionForm.quantity)"
                      disabled
                    />
                  </b-col>
                </b-row>

                <b-row
                  class="pt-4 pb-3"
                  align-h="center"
                >
                  <b-col cols="2">
                    <b-button
                      style="font-size: 16px; padding: 8px; width: 150px;"
                      pill
                      variant="danger"
                      :disabled="outboundTransactionForm.item === null || outboundTransactionForm.receiver.organization.name === ''"
                      @click="outboundTransactionConfirmModal = !outboundTransactionConfirmModal"
                    >
                      Send Donation
                    </b-button>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-col>
        </b-row>

        <b-row
          v-if="transactionChoice === 'inventory-adjustment'"
          class="pt-3"
        >
          <b-col cols="12">
            <b-card>
              <validation-observer v-slot="{ invalid }">
                <b-container fluid>
                  <b-row>
                    <b-col cols="12">
                      <h1
                        style="font-family:'Bebas Neue', cursive;"
                        no-body
                        class="text-center"
                      >
                        Inventory Adjustment
                      </h1>
                    </b-col>
                  </b-row>

                  <b-row class="pt-3">
                    <b-col cols="12">
                      <label for="inventory-adj-date">
                        Date
                      </label>
                      <b-form-datepicker
                        v-model="inventoryAdjForm.date"
                        label="Date"
                        value-as-date
                        :max="new Date()"
                      />
                    </b-col>
                  </b-row>

                  <b-row class="pt-3">
                    <b-col cols="12">
                      <label for="inventory-adj-reason">
                        Reason
                      </label>

                      <validation-provider
                        v-slot="validationContext"
                        :rules="{
                          required: true,
                        }"
                      >
                        <b-form-input
                          id="inventory-adj-reason"
                          v-model="inventoryAdjForm.reason"
                          list="inventory-adj-reason-list"
                          :state="getValidationState(validationContext)"
                          aria-describedby="inventory-adj-reason-feedback"
                        />

                        <b-form-invalid-feedback id="inventory-adj-reason-feedback">
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>

                      <datalist id="inventory-adj-reason-list">
                        <option
                          v-for="(choice, index) in reasonChoices"
                          :key="index"
                        >
                          {{ choice }}
                        </option>
                      </datalist>
                    </b-col>
                  </b-row>

                  <b-row class="pt-3">
                    <b-col cols="12">
                      <label for="inventory-adj-item-name">Item Name</label>
                      <b-dropdown
                        :text="inventoryAdjForm.item ? `${inventoryAdjForm.item.name} - ${inventoryAdjForm.item.sku}` : 'Select an item'"
                        style="width: 100%"
                        menu-class="w-100"
                        variant="outline-primary"
                        :no-caret="!!inventoryAdjForm.item"
                        no-flip
                      >
                        <b-dropdown-form>
                          <b-form-group
                            label="Search Item"
                            label-for="inventory-adj-item-search"
                            @submit.stop.prevent
                          >
                            <b-form-input
                              id="inventory-adj-item-search"
                              debounce="500"
                              @update="searchInkindDonations"
                            />
                          </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider />
                        <b-dropdown-item
                          v-for="item in inkindDonationOptions"
                          :key="item._id"
                          @click="selectInventoryAdjItem(item)"
                        >
                          {{ item.name }} <span style="color: grey; font-size: 12px">{{ item.sku }}</span>
                        </b-dropdown-item>
                      </b-dropdown>
                    </b-col>
                  </b-row>

                  <b-row
                    v-if="inventoryAdjForm.item !== null"
                    class="pt-3"
                  >
                    <b-col
                      cols="12"
                      md="4"
                    >
                      <label for="inventory-adj-item-quantity">
                        Current Quantity
                      </label>
                      <b-form-input
                        label="inventory-adj-item-quantity"
                        :value="inventoryAdjForm.item.quantity"
                        disabled
                      />
                    </b-col>

                    <b-col
                      cols="12"
                      md="4"
                    >
                      <label for="inventory-adj-item-quantity">
                        New Quantity
                      </label>
                      <b-form-input
                        v-model="inventoryAdjForm.newQuantity"
                        type="number"
                        label="inventory-adj-item-quantity"
                        lazy-formatter
                        :formatter="toNumber"
                        @blur="inventoryAdjForm.quantity = Number(inventoryAdjForm.newQuantity) - Number(inventoryAdjForm.item.quantity)"
                      />
                    </b-col>

                    <b-col
                      cols="12"
                      md="4"
                    >
                      <label for="inventory-adj-item-quantity">
                        Adjusted Quantity
                      </label>
                      <b-form-input
                        label="inventory-adj-item-quantity"
                        :value="inventoryAdjForm.quantity"
                        disabled
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    class="pt-4 pb-3"
                    align-h="center"
                  >
                    <b-col cols="2">
                      <b-button
                        style="font-size: 16px; padding: 8px; width: 150px;"
                        pill
                        variant="danger"
                        :disabled="invalid || inventoryAdjForm.item === null"
                        @click="inventoryAdjConfirmModal = !inventoryAdjConfirmModal"
                      >
                        Submit
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </validation-observer>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-overlay>

    <b-modal
      v-model="outboundTransactionConfirmModal"
      @ok="createdInkindDonationOutboundTransaction"
      @cancel="outboundTransactionConfirmModal = false"
    >
      <b-container fluid>
        <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
          Are you sure with all the details?
        </h1>
      </b-container>
    </b-modal>

    <b-modal
      v-model="inventoryAdjConfirmModal"
      @ok="createdInkindDonationTransaction"
      @cancel="inventoryAdjConfirmModal = false"
    >
      <b-container fluid>
        <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
          Are you sure with all the details?
        </h1>
      </b-container>
    </b-modal>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, min, max, email, regex } from 'vee-validate/dist/rules'

import { apiClient } from '../../axios'
import InkindDonationRepository from '../../repositories/inkind-donations'
import InkindDonationOrganizationRepository from '../../repositories/inkind-donations/organizations'
import InkindDonationTransactionRepository from '../../repositories/inkind-donations/transactions'
import InkindDonationOutboundTransactionRepository from '../../repositories/inkind-donations/outbound-transactions'
import validationMixins from '../../mixins/validation'
import regexRulesMixins from '../../mixins/regex-rules'
import formattersMixins from '../../mixins/formatters'

const inkindDonationRepository = new InkindDonationRepository(apiClient)
const inkindDonationOrganizationRepository = new InkindDonationOrganizationRepository(apiClient)
const inkindDonationTransactionRepository = new InkindDonationTransactionRepository(apiClient)
const inkindDonationOutboundTransactionRepository = new InkindDonationOutboundTransactionRepository(apiClient)

extend('required', {
  ...required,
  message: 'This field is required'
})
extend('min', {
  ...min,
  message: 'This field must be greater than or equal to {length} characters'
})
extend('max', {
  ...max,
  message: 'This field must be less than or equal to {length} characters'
})
extend('email', {
  ...email,
  message: 'This field must be a valid email'
})
extend('regex', regex)

export default {
  name: 'InkindDonationTransactionModal',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [
    validationMixins,
    regexRulesMixins,
    formattersMixins
  ],
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      modal: false,
      transactionChoice: 'send-donation',
      transactionChoices: [
        { value: 'send-donation', text: 'Send an In-Kind Donation to an Organization' },
        { value: 'inventory-adjustment', text: 'Inventory Adjustment' }
      ],
      isLoading: false,
      inkindDonationOptions: [],
      orgOptions: [],
      outboundTransactionOrgSearch: '',
      outboundTransactionConfirmModal: false,
      outboundTransactionForm: {
        item: null,
        quantity: 1,
        date: new Date(),
        receiver: {
          type: 'ORGANIZATION',
          organization: {
            name: '',
            contacts: []
          }
        }
      },
      orgContactFormDropdown: false,
      orgContactForm: {
        name: '',
        contactMethods: [{
          type: 'EMAIL',
          value: ''
        }]
      },
      inventoryAdjConfirmModal: false,
      inventoryAdjForm: {
        item: null,
        newQuantity: 0,
        quantity: 0,
        date: new Date(),
        reason: null
      },
      reasonChoices: [
        'Arrival of New Items',
        'Stolen Items',
        'Missing Items',
        'Recovered Items',
        'Damaged/Defective Items',
        'Outdated/Expired Items',
        'Returned to Donor/Supplier',
        'Inventory Error'
      ]
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    show (val) {
      this.modal = val
    }
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    inkindDonationRepository.setAuthorizationHeader(authHeader)
    inkindDonationTransactionRepository.setAuthorizationHeader(authHeader)
    inkindDonationOutboundTransactionRepository.setAuthorizationHeader(authHeader)
    inkindDonationOrganizationRepository.setAuthorizationHeader(authHeader)

    this.searchInkindDonations()
    this.searchInkindDonationOrganizations()
  },
  methods: {
    async searchInkindDonationOrganizations (value) {
      const { results } = await inkindDonationOrganizationRepository.list({
        name: value
      }, {
        limit: 5
      })

      this.orgOptions = results
    },
    isOrgSearchInOptions () {
      if (this.orgOptions.length === 0) {
        return false
      }

      const index = this.orgOptions.findIndex((option) => option.name === this.outboundTransactionOrgSearch)

      return index !== -1
    },
    selectOrganization (organization) {
      this.outboundTransactionForm.receiver.organization.name = organization.name
      this.outboundTransactionOrgSearch = ''
    },
    unselectOrganization () {
      this.outboundTransactionForm.receiver.organization.name = ''
      this.outboundTransactionOrgSearch = ''
    },
    removeOrgContact (index) {
      this.outboundTransactionForm.receiver.organization.contacts.splice(index, 1)
    },
    addOutboundTransactionContact () {
      if (this.orgContactForm.name !== '' && this.orgContactForm.contactMethods[0].value !== '') {
        this.outboundTransactionForm.receiver.organization.contacts.push(this.orgContactForm)
      }

      this.orgContactForm = {
        name: '',
        contactMethods: [{
          type: 'EMAIL',
          value: ''
        }]
      }
      this.$refs.orgContactFormDropdown.hide(true)
    },
    async searchInkindDonations (value) {
      const { results } = await inkindDonationRepository.list({
        query: value
      }, {
        limit: 5
      })

      this.inkindDonationOptions = results
    },
    selectOutboundTransactionItem (item) {
      this.outboundTransactionForm.item = item
    },
    validateOutboundTransactionQuantity (value) {
      const parsedNumber = Number(value)

      if (isNaN(parsedNumber) || parsedNumber < 0) {
        return 0
      }

      if (parsedNumber > this.outboundTransactionForm.item.quantity) {
        return 0
      }

      return parsedNumber
    },
    validateNumber (value) {
      const parsedNumber = Number(value)

      return isNaN(parsedNumber) ? '0' : parsedNumber
    },
    async createdInkindDonationOutboundTransaction () {
      this.isLoading = true

      const {
        item,
        quantity,
        date,
        receiver
      } = this.outboundTransactionForm

      try {
        await inkindDonationOutboundTransactionRepository.create({
          sku: item.sku,
          quantity,
          date,
          receiver
        })

        this.$router.push({
          path: '/inkind-donations/outbound'
        })
      } catch {
        this.isLoading = false
      }
    },
    selectInventoryAdjItem (item) {
      this.inventoryAdjForm.item = item
    },
    async createdInkindDonationTransaction () {
      this.isLoading = true

      const {
        item,
        quantity,
        date,
        reason
      } = this.inventoryAdjForm

      try {
        await inkindDonationTransactionRepository.create({
          sku: item.sku,
          quantity,
          date,
          reason
        })

        this.$router.push({
          path: '/inkind-donations/adjustments'
        })
      } catch {
        this.isLoading = false
      }
    }
  }
}
</script>
