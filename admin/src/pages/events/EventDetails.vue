<template>
    <div>
    <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
        <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
          <h5>Batangas Coastal Cleanup</h5>
          <b-row>
            <b-col>
              Location:
            </b-col>
            <b-col>
              Contact Person:
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              Date:
            </b-col>
            <b-col>
              Contact Number:
            </b-col>
          </b-row>
          <b-row>
            <b-col>
            Time:
            </b-col>
            <b-col>
            </b-col>
          </b-row>
        </b-card>
      <br>
      <br>
      <div>
        <b-img src="https://picsum.photos/1024/400/?image=41"></b-img>
      </div>
      <br>
      <br>
      <b-card>
      Donation Needed
        <b-progress :max="10000">
          <b-progress-bar :value="5000" label="5000/10000"></b-progress-bar>
        </b-progress>
      <br>
      <br>
      Volunteer Needed
      <div @click="showModal = !showModal">
        <b-progress :max="40">
          <b-progress-bar :value="30" label="30/40"></b-progress-bar>
        </b-progress>
      </div>
      <br>
      <br>
      <b-button to="/volunteersuggestion">Crowdsource</b-button>
      <br>
      <b-row>
        <b-col>
          <b-button>Volunteer</b-button>
        </b-col>
        <b-col>
          <b-button>Donate Now</b-button>
        </b-col>
      </b-row>
      </b-card>
      <br>
      <br>
      <b-card>
      <h1 style="text-align:left">Event Description</h1>
      <p style="text-align:left">
Getting to know (the real me); Knowing to get (them work together)

Hello, we know that we are in these worrying times. You might have concerns or questions about staying or looking after your safety. We miss out the opportunity to get involved with causes you are passionate about and the communities you want to help. Due to safety measures, iVolunteer Phils. temporarily put on hold on the ground volunteer activities on the website. We are advised to explore virtual volunteering opportunities in the meantime.

To support you to get or stay involved with initiatives that are important to you, we introduce the Community Service and Spirituality: Webinar - Reflection Hour Series (CSS: WRH) as our way for all of us to reflect why are we volunteering and to discern how can we be inspired more to safely engage with and serve the communities we want to assist during this global pandemic. The one-hour Moment of Reflection will begin at 6 p.m. on Wednesday, August 25, 2021.
      </p>
      </b-card>
      <br>
      <b-card>
        <h1>Sustainable Development Goals</h1>
        <b-row>
          <b-col>
          <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
        <b-form-checkbox value="orange">SDG #1</b-form-checkbox>
          </b-col>
          <b-col>
              <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
        <b-form-checkbox value="orange">SDG #4</b-form-checkbox>
          </b-col>
          <b-col>
              <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
        <b-form-checkbox value="orange">SDG #10</b-form-checkbox>
          </b-col>
        </b-row>
      </b-card>
      <br>
    <b-card>
      <h1>Event Documentation</h1>
          <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
          <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
      <h1>Event Review</h1>
        <b-form-input style="height:500px">
      </b-form-input>
    </b-card>
      <b-modal v-model="showModal" size="xl">
        <b-container>
          <b-row>
            <b-col cols="12">
              <b-card>
                <b-row>
                  <b-col>
                    <b-button>Download PDF</b-button>
                  </b-col>
                  <b-col>
                    <b-input-group size="sm">
                      <p style="font-size: 20px; font-family:'Bebas Neue', cursive;">Search &nbsp; &nbsp; </p>
                      <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search" style="height:30px; width:300px; border-radius: 10px;"
                      ></b-form-input>
                    </b-input-group>
                  </b-col>
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
                ></b-table>
              <b-col class="my-1">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </b-col>
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
    </b-card>
    </div>
</template>

<script>
export default {
  name: 'EventDetails',
  data () {
    return {
      showModal: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      items: [
        { name: 'John Oe', contactNumber: '+639123456789', role: 'Trash Collector' },
        { name: 'test Doe', contactNumber: '+639123456789', role: 'Trash Bag Distributor' },
        { name: 'abc Doe', contactNumber: '+639123456789', role: 'Trash Collector' },
        { name: 'Jfsdfs Doe', contactNumber: '+639123456789', role: 'Trash Bag Distributor' },
        { name: 'qwewq Doe', contactNumber: '+639123456789', role: 'Trash Collector' },
        { name: 'sdfsdf Doe', contactNumber: '+639123456789', role: 'Trash Collector' }
      ],
      fields: [
        { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
        { key: 'contactNumber', label: 'Contact Number', sortable: true, class: 'text-center' },
        { key: 'role', label: 'Role', sortable: true, class: 'text-center' }
      ]
    }
  },
  computed: {
    sortOption () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
