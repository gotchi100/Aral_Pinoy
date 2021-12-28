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
                    Categories
                  </h1>
                </b-col>
              </b-row>

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
                            v-model="perPage"
                            :options="pageOptions"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>

                      <!-- TODO: Implement search for inkind-categories -->
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
                    :items="getInkindCategories"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    stacked="md"
                    style="background:white"
                    show-empty
                    small
                    primary-key="_id"
                  >
                    <template #cell(bestBeforeDate)="row">
                      <b-icon
                        :icon="hasCustomField(row.item, 'bestBeforeDate') ? 'check-circle' : 'circle'"
                        font-scale="1"
                      ></b-icon>
                    </template>

                    <template #cell(expirationDate)="row">
                      <b-icon
                        :icon="hasCustomField(row.item, 'expirationDate') ? 'check-circle' : 'circle'"
                        font-scale="1"
                      ></b-icon>
                    </template>
                  </b-table>
                </b-col>
              </b-row>

              <b-row class="pt-4" align-h="end">
                <b-col cols="4">
                  <b-button
                    style="margin-top: 12px; margin-bottom: 12px; display: inline-block; font-size: 16px; width: 200px;"
                    pill
                    variant="danger"
                    @click="showAddModal = !showAddModal"
                  >
                    Add a Category Entry
                  </b-button>
                </b-col>
              </b-row>

              <b-row class="pt-4 justify-content-md-center">
                <b-col cols="6" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="total"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <b-modal v-model="showAddModal" size="xl" hide-footer>
      <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1100px; border-radius: 20px; margin-top: 40px;">
        <b-container fluid>
          <b-row>
            <b-col cols="12">
              <h1 style="font-family:'Bebas Neue', cursive;" no-body class="text-center">
                Add a Category Entry
              </h1>
            </b-col>
          </b-row>

          <b-row class="pt-1">
            <b-col cols="12">
              <label for="category-name">Category Name</label>
              <b-form-input name="category-name" v-model="addCategoryForm.name"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="pt-3">
            <b-col>
              <b-form-checkbox
                v-model="checkBestBeforeDate"
              >
                &nbsp; Requires Best Before Date?
              </b-form-checkbox>
            </b-col>

            <b-col>
              <b-form-checkbox
                v-model="checkExpirationDate"
              >
                &nbsp; Requires Expiration Date?
              </b-form-checkbox>
            </b-col>
          </b-row>

          <b-row class="pt-4 pb-3" align-h="center">
            <b-col cols="2">
              <b-button
                style="font-size: 16px; padding: 8px; width: 150px;"
                pill
                variant="danger"
                @click="showAddConfirmationModal = !showAddConfirmationModal"
              >
                Add Category
              </b-button>
            </b-col>
          </b-row>
        </b-container>

        <b-modal
          v-model="showAddConfirmationModal"
          @ok="addCategory"
          @cancel="showAddConfirmationModal = false"
        >
          <b-container fluid>
            <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
              Are you sure with all the details?
            </h1>
          </b-container>
        </b-modal>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const { apiClient } = require('../../axios')

export default {
  data () {
    return {
      fields: [
        { key: 'name', label: 'Category' },
        { key: 'bestBeforeDate', label: 'Requires Best Before Date?' },
        { key: 'expirationDate', label: 'Requires Expiration Date?' }
      ],
      categories: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20],
      addCategoryForm: {
        name: ''
      },
      checkBestBeforeDate: false,
      checkExpirationDate: false,
      showAddModal: false,
      showAddConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  methods: {
    async getInkindCategories (ctx) {
      const queryString = new URLSearchParams()

      queryString.set('limit', this.perPage)
      queryString.set('offset', this.pageOffset)

      const { data } = await apiClient.get(`/inkind-donation-categories?${queryString.toString()}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      const { results, total } = data

      this.total = total

      return results
    },
    async addCategory () {
      const { name } = this.addCategoryForm

      const customFields = {}

      if (this.checkBestBeforeDate === true) {
        customFields.bestBeforeDate = {
          label: 'Best Before Date',
          dataType: 'DATE'
        }
      }

      if (this.checkExpirationDate === true) {
        customFields.expirationDate = {
          label: 'Expiration Date',
          dataType: 'DATE'
        }
      }

      await apiClient.post('/inkind-donation-categories', {
        name,
        customFields
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })

      this.$router.go()
    },
    hasCustomField (category, field) {
      if (category.customFields === undefined) {
        return false
      }

      return category.customFields[field] !== undefined
    }
  }
}
</script>
