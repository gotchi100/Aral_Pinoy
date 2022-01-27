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

              <b-row class="my-2">
                <b-col cols="12">
                  <b-container>
                    <b-row class="mb-4" align-v="center" align-h="around">
                      <b-col cols="4">
                        <b-row align-v="center">
                          <b-col cols="3">
                            <label
                              for="per-page-select"
                              style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                            >
                              Per Page&nbsp;&nbsp;
                            </label>
                          </b-col>

                          <b-col>
                            <select v-model="perPage" class="form-select form-select-sm" aria-label="Default select example">
                              <option v-for="option in pageOptions" :key="option">
                                {{ option }}
                              </option>
                            </select>
                          </b-col>
                        </b-row>
                      </b-col>

                      <b-col cols="4">
                        <b-row align-v="center">
                          <b-col cols="3">
                            <label
                              for="filter-eventName"
                              style="font-size: 15px; font-family:'Bebas Neue', cursive;"
                            >
                              Search&nbsp;&nbsp;
                            </label>
                          </b-col>

                          <b-col>
                            <b-form-input
                              id="filter-eventName"
                              class="form-control"
                              v-model="searchFilter"
                              type="search"
                              size="sm"
                              debounce="500"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                      </b-col>
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
                    :filter="searchFilter"
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

                    <template #cell(actions)="{ item }">
                      <b-icon
                        variant="danger"
                        icon="trash-fill"
                        font-scale=".85"
                        style="cursor: pointer"
                        @click="showConfirmDelete(item)"
                      />
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
      <b-overlay :show="isLoading">
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
      </b-overlay>
    </b-modal>

    <b-modal
      v-model="deleteCategoryForm.modal"
      @ok="deleteCategory"
      @cancel="deleteCategoryForm.modal = false"
      hide-header
      :busy="isLoading"
    >
      <b-overlay :show="isLoading">
        <b-container fluid>
          <h4 style="font-family:'Bebas Neue', cursive; text-align:center;">
            Are you sure you want to delete the following category?
          </h4>

          <br />

          <h5 style="font-family:'Bebas Neue', cursive; text-align:center;">
            {{ deleteCategoryForm.category.name }}
          </h5>
        </b-container>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiClient } from '../../axios'
import InkindDonationCategoryRepository from '../../repositories/inkind-donations/categories'

const ikdCategoryRepository = new InkindDonationCategoryRepository(apiClient)

export default {
  data () {
    return {
      fields: [
        { key: 'name', label: 'Category', sortable: true },
        { key: 'bestBeforeDate', label: 'Requires Best Before Date?' },
        { key: 'expirationDate', label: 'Requires Expiration Date?' },
        { key: 'actions', label: 'Actions' }
      ],
      categories: [],
      total: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 20],
      searchFilter: '',
      addCategoryForm: {
        name: ''
      },
      isLoading: false,
      checkBestBeforeDate: false,
      checkExpirationDate: false,
      showAddModal: false,
      showAddConfirmationModal: false,
      deleteCategoryForm: {
        modal: false,
        category: {}
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    pageOffset () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  created () {
    ikdCategoryRepository.setAuthorizationHeader(`Bearer ${this.token}`)
  },
  methods: {
    async getInkindCategories (ctx) {
      const {
        filter,
        sortBy,
        sortDesc
      } = ctx

      const limit = this.perPage
      const offset = this.pageOffset
      const sort = {}

      if (sortBy !== undefined && sortBy !== '') {
        sort.field = sortBy
        sort.order = sortDesc ? 'desc' : 'asc'
      }

      const { results, total } = await ikdCategoryRepository.list({
        name: filter
      }, {
        limit,
        offset,
        sort
      })

      this.total = total

      return results
    },
    async addCategory () {
      this.isLoading = true

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

      try {
        await ikdCategoryRepository.create({
          name,
          customFields
        })

        this.$router.go()
      } catch {
        this.isLoading = false
      }
    },
    async deleteCategory () {
      this.isLoading = true

      const categoryId = this.deleteCategoryForm.category._id

      try {
        await ikdCategoryRepository.delete(categoryId)

        this.$router.go()
      } catch {
        this.isLoading = false
      }
    },
    hasCustomField (category, field) {
      if (category.customFields === undefined) {
        return false
      }

      return category.customFields[field] !== undefined
    },
    showConfirmDelete (category) {
      this.deleteCategoryForm.modal = true

      this.deleteCategoryForm.category = {
        _id: category._id,
        name: category.name
      }
    }
  }
}
</script>
