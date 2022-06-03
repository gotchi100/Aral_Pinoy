<template>
  <div>
    <b-container class="py-3">
      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Deleted Inventory Items
                  </h1>

                  <h6>
                    As of {{ new Date().toLocaleString('en-us', { dateStyle: 'medium' }) }}
                  </h6>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="12">
                  <b-table
                    :items="getDeletedInventoryItems"
                    :fields="deletedInventoryItems.fields"
                    :current-page="deletedInventoryItems.pagination.currentPage"
                    :per-page="deletedInventoryItems.pagination.perPage"
                    fixed
                    stacked="sm"
                    style="background:white"
                    show-empty
                    primary-key="_id"
                  >
                    <template #cell(deletedOn)="{ item }">
                      <span>
                        {{
                          new Date(item.deletedOn).toLocaleString('en-us', {
                            dateStyle: 'medium'
                          })
                        }}
                      </span>
                    </template>
                  </b-table>
                </b-col>

                <b-col cols="12">
                  <b-pagination
                    v-model="deletedInventoryItems.pagination.currentPage"
                    :total-rows="deletedInventoryItems.total"
                    :per-page="deletedInventoryItems.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="pb-3">
      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Expiring Inventory Items
                  </h1>

                  <h6>
                    As of {{ new Date().toLocaleString('en-us', { dateStyle: 'medium' }) }}
                  </h6>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col cols="12">
                  <b-table
                    :items="getExpiringInventoryItems"
                    :fields="expiringInventoryItems.fields"
                    :current-page="expiringInventoryItems.pagination.currentPage"
                    :per-page="expiringInventoryItems.pagination.perPage"
                    fixed
                    stacked="sm"
                    style="background:white"
                    show-empty
                    primary-key="_id"
                  >
                    <template #cell(bestBeforeDate)="{ item }">
                      <span v-if="hasItemCustomCategory(item.category.customFields, 'bestBeforeDate')">
                        {{
                          new Date(item.category.customFields.bestBeforeDate).toLocaleString('en-us', {
                            dateStyle: 'medium'
                          })
                        }}
                      </span>
                    </template>

                    <template #cell(expirationDate)="{ item }">
                      <span v-if="hasItemCustomCategory(item.category.customFields, 'expirationDate')">
                        {{
                          new Date(item.category.customFields.expirationDate).toLocaleString('en-us', {
                            dateStyle: 'medium'
                          })
                        }}
                      </span>
                    </template>
                  </b-table>
                </b-col>

                <b-col cols="12">
                  <b-pagination
                    v-model="expiringInventoryItems.pagination.currentPage"
                    :total-rows="expiringInventoryItems.total"
                    :per-page="expiringInventoryItems.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="pb-3">
      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Inventory Items by Group
                  </h1>

                  <h6>
                    As of {{ new Date().toLocaleString('en-us', { dateStyle: 'medium' }) }}
                  </h6>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col
                  cols="12"
                  class="pb-3"
                >
                  <b-dropdown
                    :text="inventoryItemsByGroup.groupInput || 'Ungrouped Items'"
                    style="width: 100%"
                    menu-class="w-100"
                    variant="outline-primary"
                    :no-caret="!!inventoryItemsByGroup.groupInput"
                    no-flip
                  >
                    <b-dropdown-form>
                      <b-form-group
                        label="Search Group"
                        label-for="item-group"
                        @submit.stop.prevent
                      >
                        <b-form-input
                          id="item-group"
                          debounce="250"
                          @update="searchInventoryItemGroups"
                        />
                      </b-form-group>
                    </b-dropdown-form>

                    <b-dropdown-divider />

                    <b-dropdown-item
                      v-for="group in inventoryItemsByGroup.filterOptions.groupOptions"
                      :key="group._id"
                      @click="inventoryItemsByGroup.groupInput = group.name"
                    >
                      {{ group.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-col>

                <b-col cols="12">
                  <b-table
                    ref="inventoryItemsByGroupTable"
                    :items="getInventoryItemsByGroup"
                    :fields="inventoryItemsByGroup.fields"
                    :current-page="inventoryItemsByGroup.pagination.currentPage"
                    :per-page="inventoryItemsByGroup.pagination.perPage"
                    fixed
                    stacked="sm"
                    style="background:white"
                    show-empty
                    primary-key="_id"
                  />
                </b-col>

                <b-col cols="12">
                  <b-pagination
                    v-model="inventoryItemsByGroup.pagination.currentPage"
                    :total-rows="inventoryItemsByGroup.total"
                    :per-page="inventoryItemsByGroup.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="pb-3">
      <b-row class="pb-3">
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container
              fluid
            >
              <b-row
                class="py-2"
              >
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Inventory Items by Category
                  </h1>

                  <h6>
                    As of {{ new Date().toLocaleString('en-us', { dateStyle: 'medium' }) }}
                  </h6>
                </b-col>
              </b-row>

              <b-row class="pb-3">
                <b-col
                  cols="12"
                  class="pb-3"
                >
                  <b-dropdown
                    :text="inventoryItemsByCategory.categoryInput || 'Uncategorized Items'"
                    style="width: 100%"
                    menu-class="w-100"
                    variant="outline-primary"
                    :no-caret="!!inventoryItemsByCategory.categoryInput"
                    no-flip
                  >
                    <b-dropdown-form>
                      <b-form-group
                        label="Search Category"
                        label-for="item-category"
                        @submit.stop.prevent
                      >
                        <b-form-input
                          id="item-group"
                          debounce="250"
                          @update="searchInventoryItemCategories"
                        />
                      </b-form-group>
                    </b-dropdown-form>

                    <b-dropdown-divider />

                    <b-dropdown-item
                      v-for="category in inventoryItemsByCategory.filterOptions.categoryOptions"
                      :key="category._id"
                      @click="inventoryItemsByCategory.categoryInput = category.name"
                    >
                      {{ category.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-col>

                <b-col cols="12">
                  <b-table
                    ref="inventoryItemsByCategoryTable"
                    :items="getInventoryItemsByCategory"
                    :fields="inventoryItemsByCategory.fields"
                    :current-page="inventoryItemsByCategory.pagination.currentPage"
                    :per-page="inventoryItemsByCategory.pagination.perPage"
                    fixed
                    stacked="sm"
                    style="background:white"
                    show-empty
                    primary-key="_id"
                  />
                </b-col>

                <b-col cols="12">
                  <b-pagination
                    v-model="inventoryItemsByCategory.pagination.currentPage"
                    :total-rows="inventoryItemsByCategory.total"
                    :per-page="inventoryItemsByCategory.pagination.perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  />
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ReportRepository from '../../repositories/reports'
import InkindDonationGroupRepository from '../../repositories/inkind-donations/groups'
import InkindDonationCategoryRepository from '../../repositories/inkind-donations/categories'
import { apiClient } from '../../axios'

const reportRepository = new ReportRepository(apiClient)
const inkindDonationGroupRepository = new InkindDonationGroupRepository(apiClient)
const inkindDonationCategoryRepository = new InkindDonationCategoryRepository(apiClient)

export default {
  name: 'ReportInkindDonations',
  data () {
    return {
      deletedInventoryItems: {
        results: [],
        total: 0,
        pagination: {
          currentPage: 1,
          perPage: 25
        },
        fields: [
          { key: 'sku', label: 'SKU', sortable: true },
          { key: 'name', label: 'Item', sortable: true },
          { key: 'category.name', label: 'Category' },
          { key: 'deletedOn', label: 'Date of Deletion', sortable: true }
        ]
      },
      expiringInventoryItems: {
        results: [],
        total: 0,
        pagination: {
          currentPage: 1,
          perPage: 25
        },
        fields: [
          { key: 'sku', label: 'SKU' },
          { key: 'name', label: 'Item' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'category.name', label: 'Category' },
          { key: 'bestBeforeDate', label: 'Best Before' },
          { key: 'expirationDate', label: 'Expiration Date' }
        ]
      },
      inventoryItemsByGroup: {
        results: [],
        total: 0,
        pagination: {
          currentPage: 1,
          perPage: 25
        },
        fields: [
          { key: 'sku', label: 'SKU' },
          { key: 'name', label: 'Item' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'category.name', label: 'Category' }
        ],
        groupInput: '',
        filterOptions: {
          groupOptions: []
        }
      },
      inventoryItemsByCategory: {
        results: [],
        total: 0,
        pagination: {
          currentPage: 1,
          perPage: 25
        },
        fields: [
          { key: 'sku', label: 'SKU' },
          { key: 'name', label: 'Item' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'group', label: 'Group' }
        ],
        categoryInput: '',
        filterOptions: {
          categoryOptions: []
        }
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    'inventoryItemsByGroup.groupInput' () {
      this.$refs.inventoryItemsByGroupTable.refresh()
    },
    'inventoryItemsByCategory.categoryInput' () {
      this.$refs.inventoryItemsByCategoryTable.refresh()
    }
  },
  created () {
    const authHeader = `Bearer ${this.token}`

    reportRepository.setAuthorizationHeader(authHeader)
    inkindDonationGroupRepository.setAuthorizationHeader(authHeader)
    inkindDonationCategoryRepository.setAuthorizationHeader(authHeader)
  },
  methods: {
    async getDeletedInventoryItems (ctx) {
      const {
        sortBy,
        sortDesc
      } = ctx

      const { currentPage, perPage } = this.deletedInventoryItems.pagination

      const offset = this.calculateOffset(currentPage, perPage)
      let sort

      if (sortBy !== undefined && sortBy !== '') {
        sort = {
          field: sortBy,
          order: sortDesc ? 'desc' : 'asc'
        }
      }

      const { results, total } = await reportRepository.getDeletedInventoryItems({
        start: new Date(0).toJSON(),
        end: new Date().toJSON()
      }, {
        limit: perPage,
        offset,
        sort
      })

      this.deletedInventoryItems.total = total

      return results
    },
    async getExpiringInventoryItems (ctx) {
      const { currentPage, perPage } = this.expiringInventoryItems.pagination

      const offset = this.calculateOffset(currentPage, perPage)

      const { results, total } = await reportRepository.getExpiringInventoryItems({
        limit: perPage,
        offset
      })

      this.expiringInventoryItems.total = total

      return results
    },
    async getInventoryItemsByGroup (ctx) {
      const { currentPage, perPage } = this.inventoryItemsByGroup.pagination

      const offset = this.calculateOffset(currentPage, perPage)

      const { results, total } = await reportRepository.getInventoryItemsByGroup({
        group: this.inventoryItemsByGroup.groupInput,
        options: {
          limit: perPage,
          offset
        }
      })

      this.inventoryItemsByGroup.total = total

      return results
    },
    async getInventoryItemsByCategory (ctx) {
      const { currentPage, perPage } = this.inventoryItemsByCategory.pagination

      const offset = this.calculateOffset(currentPage, perPage)

      const { results, total } = await reportRepository.getInventoryItemsByCategory({
        category: this.inventoryItemsByCategory.categoryInput,
        options: {
          limit: perPage,
          offset
        }
      })

      this.inventoryItemsByCategory.total = total

      return results
    },
    getItemExpirationDate (item) {
      if (item.category.customFields.expirationDate !== undefined) {
        return new Date(item.category.customFields.expirationDate)
      }

      if (item.category.customFields.bestBeforeDate !== undefined) {
        return new Date(item.category.customFields.bestBeforeDate)
      }
    },
    calculateOffset (currentPage, perPage) {
      return (currentPage - 1) * perPage
    },
    hasItemCustomCategory (value, field) {
      if (value === undefined) {
        return false
      }

      return value[field] !== undefined
    },
    async searchInventoryItemGroups (value) {
      const { results } = await inkindDonationGroupRepository.list({
        name: value
      }, {
        limit: 5
      })

      this.inventoryItemsByGroup.filterOptions.groupOptions = results
    },
    async searchInventoryItemCategories (value) {
      const { results } = await inkindDonationCategoryRepository.list({
        name: value
      }, {
        limit: 5
      })

      this.inventoryItemsByCategory.filterOptions.categoryOptions = results
    }
  }
}
</script>
