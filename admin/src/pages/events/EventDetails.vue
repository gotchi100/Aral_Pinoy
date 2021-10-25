<template>
    <div>
      <h5>No label</h5>
      <div @click="showModal = !showModal">
        <b-progress :value="50" :max="100" class="mb-3"></b-progress>
      </div>

      <b-modal v-model="showModal" size="xl">
        <b-container>
          <b-row>
            <b-col cols="12">
              <b-card>
                <b-table
                  :items="items"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :sort-by.sync="sortBy"
                  stacked="md"
                  show-empty
                  small
                ></b-table>

                <template #footer>
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="items.length"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </template>
              </b-card>
            </b-col>

            <b-col cols="12">
              <b-card>
                <b-container>
                  <b-row>
                    <b-col cols="12">
                      <h2>Role</h2>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col cols="12">
                      <h5>Trash Collector</h5>
                      <b-progress :max="20">
                        <b-progress-bar :value="14" label="14/20"></b-progress-bar>
                      </b-progress>
                    </b-col>

                    <b-col cols="12">
                      <h5>Trash Bag Distributor</h5>
                      <b-progress :max="20">
                        <b-progress-bar :value="12" label="12/20"></b-progress-bar>
                      </b-progress>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </b-modal>
    </div>
</template>

<script>
export default {
  name: 'EventDetails',
  data () {
    return {
      showModal: false,
      currentPage: 0,
      perPage: 5,
      sortBy: 'age',
      items: [
        { name: 'John Doe', contactNumber: '+639123456789', role: 'Trash Collector' },
        { name: 'John Doe', contactNumber: '+639123456789', role: 'Trash Bag Distributor' },
        { name: 'John Doe', contactNumber: '+639123456789', role: 'Trash Collector' },
        { name: 'John Doe', contactNumber: '+639123456789', role: 'Trash Bag Distributor' },
        { name: 'John Doe', contactNumber: '+639123456789', role: 'Trash Collector' }
      ],
      fields: [
        { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
        { key: 'contactNumber', label: 'Contact Number', class: 'text-center' },
        { key: 'role', label: 'Role', sortable: true, class: 'text-center' }
      ]
    }
  }
}
</script>
