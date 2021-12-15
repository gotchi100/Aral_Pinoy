<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card class="card" style="border-radius: 20px;">
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    In-Kind Donations Inventory
                  </h1>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-tabs pills card>
                    <!-- <b-tab title="Compiled View">
                      <b-card-text>
                        <b-row>
                          <b-container class="bv-example-row">
                            <b-row>
                              <b-col>
                                <b-col sm="5" md="6" class="my-1">
                                  <b-form-group style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                                    label="Per page"
                                    label-for="per-page-select"
                                    label-cols-sm="6"
                                    label-cols-md="4"
                                    label-cols-lg="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    class="mb-0"
                                  >
                                    <b-form-select
                                      id="per-page-select"
                                      v-model="perPage"
                                      :options="pageOptions"
                                      size="sm"
                                    ></b-form-select>
                                  </b-form-group>
                                </b-col>
                              </b-col>
                              <b-col>
                              </b-col>
                              <b-col>
                                <br>
                                <b-input-group size="sm">
                                  <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                                  <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                                  ></b-form-input>
                                </b-input-group>
                                <br>
                              </b-col>
                            </b-row>
                          </b-container>
                        </b-row>

                        <b-table
                          :items="items"
                          :fields="fields"
                          :current-page="currentPage"
                          :per-page="perPage"
                          :filter="filter"
                          :filter-included-fields="filterOn"
                          :sort-by.sync="sortBy"
                          :sort-desc.sync="sortDesc"
                          :sort-direction="sortDirection"
                          stacked="md"
                          show-empty
                          small
                          @filtered="onFiltered"
                          style="background:white"
                        >
                          <template #cell(name)="row">
                            {{ row.value.first }} {{ row.value.last }}
                          </template>

                          <template #row-details="row">
                            <b-card>
                              <ul>
                                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                              </ul>
                            </b-card>
                          </template>
                        </b-table>
                        <b-row>
                          <b-col cols="8"></b-col>
                          <b-col>
                            <b-button @click="showModal = !showModal" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 180px;">
                              Enter a Transaction
                            </b-button>
                    </b-col>
                    <b-col>
                      <b-button to="/inkind-donations/categories" pill variant="danger" style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 180px;">
                        View Categories
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row class="justify-content-md-center">
                    <b-col cols="6" class="my-1">
                      <b-pagination
                        v-model="currentPage2"
                        :total-rows="totalRows2"
                        :per-page="perPage2"
                        align="fill"
                      ></b-pagination>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-tab> -->

              <b-tab title="Detailed View" active>
                <b-row>
                  <b-col cols="12">
                    <b-container>
                      <b-row>
                        <b-col cols="4">
                          <b-form-group
                            style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                            label="Per page"
                            label-for="per-page-select"
                            content-cols="12"
                          >
                            <b-form-select
                              id="per-page-select"
                              class="w-25"
                              v-model="inkindDonationPerPage"
                              :options="pageOptions"
                            ></b-form-select>
                          </b-form-group>
                        </b-col>

                        <!-- TODO: Implement search for detailed inkind donations -->
                        <!-- <b-col>
                          <br>
                          <b-input-group size="sm">
                            <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                            <b-form-input
                              id="filter-input"
                              v-model="filter"
                              type="search"
                              placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                            ></b-form-input>
                          </b-input-group>
                          <br>
                        </b-col> -->
                      </b-row>
                    </b-container>
                  </b-col>
                </b-row>

                <b-row class="pt-4">
                  <b-col cols="12">
                    <b-table
                      :items="getInkindDonations"
                      :fields="inkindDonationFields"
                      :current-page="inkindDonationCurrentPage"
                      :per-page="inkindDonationPerPage"
                      stacked="md"
                      style="background:white"
                      show-empty
                      small
                      primary-key="_id"
                    >
                      <template #cell(bestBeforeDate)="row">
                        <span v-if="row.item.category !== undefined && row.item.category.customFields">
                          {{
                            new Date(row.item.category.customFields.bestBeforeDate).toLocaleString('en-us', {
                              dateStyle: 'medium'
                            })
                          }}
                        </span>
                      </template>

                      <template #cell(expirationDate)="row">
                        <span v-if="row.item.category !== undefined && row.item.category.customFields">
                          {{
                            new Date(row.item.category.customFields.expirationDate).toLocaleString('en-us', {
                              dateStyle: 'medium'
                            })
                          }}
                        </span>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>

                <b-row class="pt-4" align-h="end">
                  <b-col cols="2">
                    <b-button
                      style="font-size: 16px; width: 200px;"
                      pill
                      variant="danger"
                      @click="createItemModal = !createItemModal"
                    >
                      Add an Item
                    </b-button>
                  </b-col>
                  <b-col cols="2">
                    <b-button
                      style="font-size: 16px; width: 200px;"
                      pill
                      variant="danger"
                      @click="transactionModal = !transactionModal"
                    >
                      Create a Transaction
                    </b-button>
                  </b-col>
                  <b-col cols="2">
                    <b-button
                      to="/inkind-donations/adjustments"
                      style="font-size: 16px; width: 200px;"
                      pill
                      variant="danger"
                    >
                      View Adjustments
                    </b-button>
                  </b-col>
                  <b-col cols="2">
                    <b-button
                      style="font-size: 16px; width: 200px;"
                      to="/inkind-donations/categories"
                      pill
                      variant="danger"
                    >
                      View Categories
                    </b-button>
                  </b-col>
                </b-row>

                <b-row class="pt-4 justify-content-md-center">
                  <b-col cols="6" class="my-1">
                    <b-pagination
                      v-model="inkindDonationCurrentPage"
                      :total-rows="inkindDonationTotal"
                      :per-page="inkindDonationPerPage"
                      align="fill"
                      size="sm"
                      class="my-0"
                    ></b-pagination>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>

      <b-modal v-model="createItemModal" size="xl" hide-footer>
        <b-card>
          <b-container fluid>
            <b-row>
              <b-col cols="12">
                <h1 style="font-family:'Bebas Neue', cursive;" no-body class="text-center">
                  Add an in-kind donation
                </h1>
              </b-col>
            </b-row>

            <b-row class="pt-1">
              <b-col cols="12" md="6">
                <label for="item-sku">
                  Stock Keeping Unit (SKU) <b-icon v-b-tooltip="'Unique identifier of the item'" icon="info-circle" font-scale=".85"></b-icon>
                </label>
                <b-form-input v-model="createItemForm.sku" name="item-sku"></b-form-input>
              </b-col>

              <b-col cols="12" md="6">
                <label for="item-name">Item Name</label>
                <b-form-input v-model="createItemForm.name" name="item-name"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="pt-1">
              <b-col cols="12">
                <b-form-group class="text-start">
                  <label for="item-description">
                    Item Description
                  </label>
                  <b-form-textarea id="item-description" rows="3" max-rows="8" v-model="createItemForm.description"></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="12" md="6">
                <label for="item-quantity">Initial Quantity</label>
                <b-form-input v-model="createItemForm.quantity" type="number" name="item-quantity"></b-form-input>
              </b-col>

              <b-col cols="12" md="6">
                <label for="item-uom">Unit of Measurement</label>
                <b-form-select
                  v-model="createItemForm.unit"
                  style="width: 100%; padding: 0.5rem 0.75rem"
                  name="item-uom"
                  :options="unitOptions"
                  size="lg"
                ></b-form-select>
              </b-col>
            </b-row>

            <b-row class="pt-3">
              <b-col cols="12">
                <label for="item-category">Category</label>
                <b-dropdown
                  :text="createItemForm.category ? createItemForm.category.name : 'Select a category'"
                  style="width: 100%"
                  menu-class="w-100"
                  variant="outline-primary"
                  :no-caret="!!createItemForm.category"
                  no-flip
                >
                  <b-dropdown-form>
                    <b-form-group label="Search Category" label-for="item-category" @submit.stop.prevent>
                      <b-form-input
                        id="item-category"
                        debounce="500"
                        @update="searchInkindDonationCategories"
                      ></b-form-input>
                    </b-form-group>
                  </b-dropdown-form>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item
                    v-for="category in categoryOptions"
                    :key="category._id"
                    @click="selectCategory(category)"
                  >
                    {{ category.name }}
                  </b-dropdown-item>
                </b-dropdown>
              </b-col>
            </b-row>

            <b-row v-if="createItemForm.categoryCustomFields.length > 0" class="pt-3">
              <b-col v-for="customField in createItemForm.categoryCustomFields" :key="customField.key">
                <template v-if="customField.dataType === 'DATE'">
                  <label :for="customField.key">{{ customField.label }}</label>
                  <b-form-datepicker :label="customField.key" v-model="customField.value" value-as-date></b-form-datepicker>
                </template>
              </b-col>
            </b-row>

            <b-row class="pt-1">
              <b-col cols="12">
                <label for="item-donor">
                  Donor
                </label>
                <b-form-input v-model="createItemForm.donor" name="item-donor"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="pt-4 pb-3" align-h="center">
              <b-col cols="2">
                <b-button
                  style="font-size: 16px; padding: 8px; width: 150px;"
                  pill
                  variant="danger"
                  @click="createItemConfirmModal = !createItemConfirmModal"
                >
                  Add Donation
                </b-button>
              </b-col>
            </b-row>
          </b-container>

          <b-modal
            v-model="createItemConfirmModal"
            @ok="createdInkindDonation"
            @cancel="createItemConfirmModal = false"
          >
            <b-container fluid>
              <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
                Are you sure with all the details?
              </h1>
            </b-container>
          </b-modal>
        </b-card>
      </b-modal>

      <b-modal v-model="transactionModal" size="xl" hide-footer>
        <div>
          <b-row>
            <b-col cols="12">
              <h1 style="font-family:'Bebas Neue', cursive;" no-body class="text-center">Enter a Transaction</h1>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" class="text-center">
              <b-form-select v-model="transactionChoice" :options="transactionChoices"></b-form-select>
            </b-col>
          </b-row>

          <b-row v-if="transactionChoice === 'send-donation'" class="pt-3">
            <b-col cols="12">
              <b-card>
                <b-container fluid>
                  <b-row>
                    <b-col cols="12">
                      <h1 style="font-family:'Bebas Neue', cursive;" no-body class="text-center">
                        Send an In-Kind Donation to an Organization
                      </h1>
                    </b-col>
                  </b-row>

                  <b-row class="pt-3">
                    <b-col cols="12">
                      <label for="outbound-transaction-receiver-org-name">
                        Organization Name
                      </label>
                      <b-form-input
                        id="outbound-transaction-receiver-org-name"
                        v-model="outboundTransactionForm.receiver.organization.name"
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="pt-3">
                    <b-col cols="12">
                      <b-form-tags>
                        <template>
                          <ul v-if="outboundTransactionForm.receiver.organization.contacts.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="(contact, index) in outboundTransactionForm.receiver.organization.contacts" :key="index" class="list-inline-item">
                              <b-form-tag class="bg-success" @remove="removeOrgContact(index)">
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
                              <b-form-group label="Name" label-for="outbound-transaction-receiver-contact-name" @submit.stop.prevent>
                                <b-form-input
                                  id="outbound-transaction-receiver-contact-name"
                                  v-model="orgContactForm.name"
                                ></b-form-input>
                              </b-form-group>

                              <b-form-group class="pt-3" label="Contact Method Type" label-for="outbound-transaction-receiver-contact-method-type" @submit.stop.prevent>
                                <b-input-group>
                                  <b-form-select
                                    id="outbound-transaction-receiver-contact-method-type"
                                    v-model="orgContactForm.contactMethods[0].type"
                                    style="width: 100%; padding: 0.5rem 0.75rem"
                                    :options="['EMAIL', 'MOBILE']"
                                    size="lg"
                                  ></b-form-select>
                                </b-input-group>
                              </b-form-group>

                              <b-form-group class="pt-3" label="Contact Method Value" label-for="outbound-transaction-receiver-contact-method-value" @submit.stop.prevent>
                                <b-input-group>
                                  <b-form-input
                                    id="outbound-transaction-receiver-contact-method-value"
                                    class="ml-3"
                                    v-model="orgContactForm.contactMethods[0].value"
                                  ></b-form-input>
                                </b-input-group>
                              </b-form-group>

                              <b-button class="mt-4" variant="success" @click="addOutboundTransactionContact">Submit</b-button>
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
                      <b-form-datepicker label="Date" v-model="outboundTransactionForm.date" value-as-date></b-form-datepicker>
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
                          <b-form-group label="Search Item" label-for="inventory-adj-item-search" @submit.stop.prevent>
                            <b-form-input
                              id="inventory-adj-item-search"
                              debounce="500"
                              @update="searchInkindDonations"
                            ></b-form-input>
                          </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
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

                  <b-row v-if="outboundTransactionForm.item !== null" class="pt-3">
                    <b-col cols="12" md="4">
                      <label for="inventory-adj-item-quantity">
                        Current Quantity
                      </label>
                      <b-form-input label="inventory-adj-item-quantity" :value="outboundTransactionForm.item.quantity" disabled></b-form-input>
                    </b-col>

                    <b-col cols="12" md="4">
                      <label for="inventory-adj-item-quantity">
                        How many to donate
                      </label>
                      <b-form-input
                        type="number"
                        label="inventory-adj-item-quantity"
                        v-model="outboundTransactionForm.quantity"
                        lazy-formatter
                        :formatter="validateOutboundTransactionQuantity"
                        :min="1"
                        :max="outboundTransactionForm.item.quantity"
                      ></b-form-input>
                    </b-col>

                    <b-col cols="12" md="4">
                      <label for="inventory-adj-item-quantity">
                        New Quantity
                      </label>
                      <b-form-input
                        label="inventory-adj-item-quantity"
                        :value="Number(outboundTransactionForm.item.quantity) - Number(outboundTransactionForm.quantity)"
                        disabled
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="pt-4 pb-3" align-h="center">
                    <b-col cols="2">
                      <b-button
                        style="font-size: 16px; padding: 8px; width: 150px;"
                        pill
                        variant="danger"
                        @click="outboundTransactionConfirmModal = !outboundTransactionConfirmModal"
                      >
                        Send Donation
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>

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
              </b-card>
            </b-col>
          </b-row>

          <b-row v-if="transactionChoice === 'inventory-adjustment'" class="pt-3">
            <b-col cols="12">
              <b-card>
                <b-container fluid>
                  <b-row>
                    <b-col cols="12">
                      <h1 style="font-family:'Bebas Neue', cursive;" no-body class="text-center">
                        Inventory Adjustment
                      </h1>
                    </b-col>
                  </b-row>

                  <b-row class="pt-3">
                    <label for="inventory-adj-date">
                      Date
                    </label>
                    <b-form-datepicker
                      label="Date"
                      v-model="inventoryAdjForm.date"
                      value-as-date
                      :max="new Date()"
                    ></b-form-datepicker>
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
                          <b-form-group label="Search Item" label-for="inventory-adj-item-search" @submit.stop.prevent>
                            <b-form-input
                              id="inventory-adj-item-search"
                              debounce="500"
                              @update="searchInkindDonations"
                            ></b-form-input>
                          </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
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

                  <b-row v-if="inventoryAdjForm.item !== null" class="pt-3">
                    <b-col cols="12" md="4">
                      <label for="inventory-adj-item-quantity">
                        Current Quantity
                      </label>
                      <b-form-input label="inventory-adj-item-quantity" :value="inventoryAdjForm.item.quantity" disabled></b-form-input>
                    </b-col>

                    <b-col cols="12" md="4">
                      <label for="inventory-adj-item-quantity">
                        New Quantity
                      </label>
                      <b-form-input
                        type="number"
                        label="inventory-adj-item-quantity"
                        v-model="inventoryAdjForm.newQuantity"
                        lazy-formatter
                        :formatter="validateNumber"
                        @blur="inventoryAdjForm.quantity = Number(inventoryAdjForm.newQuantity) - Number(inventoryAdjForm.item.quantity)"
                      ></b-form-input>
                    </b-col>

                    <b-col cols="12" md="4">
                      <label for="inventory-adj-item-quantity">
                        Adjusted Quantity
                      </label>
                      <b-form-input label="inventory-adj-item-quantity" :value="inventoryAdjForm.quantity" disabled></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row class="pt-4 pb-3" align-h="center">
                    <b-col cols="2">
                      <b-button
                        style="font-size: 16px; padding: 8px; width: 150px;"
                        pill
                        variant="danger"
                        @click="inventoryAdjConfirmModal = !inventoryAdjConfirmModal"
                      >
                        Submit
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>

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
              </b-card>
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

const axios = require('axios').default

export default {
  data () {
    return {
      pageOptions: [5, 10, 20],
      items: [
        { item: 'Unicef Shirt', qty: 80, ctgry: 'Apparel' },
        { item: 'Monggol Pencil', qty: 300, ctgry: 'School Material' },
        { item: 'Nissin Cup Noodles', qty: 250, ctgry: 'Food' },
        { item: 'FUnicef Shirt', qty: 80, ctgry: 'Apparel' },
        { item: 'Bonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material' },
        { item: 'Zissin Cup Noodles', qty: 250, ctgry: 'Food' },
        { item: 'Bnicef Shirt Large', qty: 20, ctgry: 'Apparel' },
        { item: 'Bnicef Shirt Medium', qty: 20, ctgry: 'Apparel' },
        { item: 'Bnicef Shirt Small', qty: 40, ctgry: 'Apparel' },
        { item: 'Nonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material' },
        { item: 'Missin Cup Noodles', qty: 250, ctgry: 'Food' },
        { item: 'Ynicef Shirt Large', qty: 20, ctgry: 'Apparel' },
        { item: 'Ynicef Shirt Medium', qty: 20, ctgry: 'Apparel' },
        { item: 'Ynicef Shirt Small', qty: 40, ctgry: 'Apparel' },
        { item: 'Yonggol Volume 2 Pencil', qty: 300, ctgry: 'School Material' },
        { item: 'Pissin Cup Noodles', qty: 250, ctgry: 'Food' }
      ],
      fields: [
        { key: 'item', label: 'Item', sortable: true, class: 'text-center' },
        { key: 'qty', label: 'Quantity', sortable: true, class: 'text-center' },
        { key: 'ctgry', label: 'Category', sortable: true, class: 'text-center' },
        { key: 'actions', label: ' ' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      inkindDonationFields: [
        { key: 'sku', label: 'SKU' },
        { key: 'name', label: 'Item' },
        { key: 'donor', label: 'Donor' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'category.name', label: 'Category' },
        { key: 'bestBeforeDate', label: 'Best Before' },
        { key: 'expirationDate', label: 'Expiration Date' }
      ],
      inkindDonations: [],
      inkindDonationTotal: 0,
      inkindDonationCurrentPage: 1,
      inkindDonationPerPage: 5,
      createItemModal: false,
      createItemConfirmModal: false,
      createItemForm: {
        sku: '',
        name: '',
        description: '',
        quantity: 0,
        unit: 'boxes',
        donor: '',
        category: null,
        categoryCustomFields: []
      },
      unitOptions: [
        { value: 'boxes', text: 'Boxes' },
        { value: 'pcs', text: 'Pieces' },
        { value: 'packs', text: 'Packs' },
        { value: 'bottles', text: 'Bottles' },
        { value: 'gallons', text: 'Gallons' },
        { value: 'kg', text: 'Kilograms' },
        { value: 'L', text: 'Liters' }
      ],
      categoryOptions: [],
      transactionModal: false,
      transactionChoice: 'send-donation',
      transactionChoices: [
        { value: 'send-donation', text: 'Send an In-Kind Donation to an Organization' },
        { value: 'inventory-adjustment', text: 'Inventory Adjustment' }
      ],
      inventoryAdjConfirmModal: false,
      inventoryAdjForm: {
        item: null,
        newQuantity: 0,
        quantity: 0,
        date: new Date()
      },
      inkindDonationOptions: [],
      outboundTransactionConfirmModal: false,
      outboundTransactionForm: {
        item: null,
        quantity: 0,
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
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    inkindDonationPageOffset () {
      return (this.inkindDonationCurrentPage - 1) * this.inkindDonationPerPage
    }

  },
  created () {
    this.searchInkindDonationCategories()
    this.searchInkindDonations()
  },
  methods: {
    async getInkindDonations (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('limit', this.perPage)
      queryString.set('offset', this.inkindDonationPageOffset)

      const { data } = await axios.get(`http://localhost:3000/inkind-donations?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      const { results, total } = data

      this.inkindDonationTotal = total

      return results
    },
    async searchInkindDonationCategories (value) {
      const queryString = new URLSearchParams()

      queryString.set('limit', 5)

      if (value !== undefined && value !== '') {
        queryString.set('filters.name', value)
      }

      const { data } = await axios.get(`http://localhost:3000/inkind-donation-categories?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.categoryOptions = data.results
    },
    selectCategory (category) {
      this.createItemForm.category = category

      this.createItemForm.categoryCustomFields = []

      if (category.customFields !== undefined) {
        for (const key of Object.keys(category.customFields)) {
          this.createItemForm.categoryCustomFields.push({
            label: category.customFields[key].label,
            dataType: category.customFields[key].dataType,
            key,
            value: undefined
          })
        }
      }
    },
    async createdInkindDonation () {
      const {
        sku,
        name,
        description,
        quantity,
        unit,
        donor,
        category,
        categoryCustomFields
      } = this.createItemForm

      let categoryId

      if (category !== null) {
        categoryId = category._id
      }

      const inkindDonation = _.pickBy({
        sku,
        name,
        description,
        quantity,
        unit,
        donor,
        categoryId,
        categoryCustomFields
      }, _.identity)

      await axios.post('http://localhost:3000/inkind-donations', inkindDonation, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.$router.go()
    },
    async searchInkindDonations (value) {
      const queryString = new URLSearchParams()

      queryString.set('limit', 5)

      if (value !== undefined && value !== '') {
        queryString.set('filters.query', value)
      }

      const { data } = await axios.get(`http://localhost:3000/inkind-donations?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.inkindDonationOptions = data.results
    },
    selectInventoryAdjItem (item) {
      this.inventoryAdjForm.item = item
    },
    validateNumber (value) {
      const parsedNumber = Number(value)

      return isNaN(parsedNumber) ? '0' : parsedNumber
    },
    async createdInkindDonationTransaction () {
      const {
        item,
        quantity,
        date
      } = this.inventoryAdjForm

      await axios.post('http://localhost:3000/inkind-donation-transactions', {
        sku: item.sku,
        quantity,
        date
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.$router.push({
        path: '/inkind-donations/adjustments'
      })
    },
    async createdInkindDonationOutboundTransaction () {
      const {
        item,
        quantity,
        date,
        receiver
      } = this.outboundTransactionForm

      await axios.post('http://localhost:3000/inkind-donation-outbound-transactions', {
        sku: item.sku,
        quantity,
        date,
        receiver
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.$router.push({
        path: '/inkind-donations/outbound'
      })
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
    removeOrgContact (index) {
      this.outboundTransactionForm.receiver.organization.contacts.splice(index, 1)
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
    }
  }
}
</script>
