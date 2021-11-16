<template>
  <div>
    <div class="addskill">
      <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 950px; border-radius: 20px; margin-top: 40px;">
        <b-container fluid>
            <h1 style="font-family:'Bebas Neue', cursive;">
                Send an In-kind Donation
            </h1>
          <b-row class="my-1">
          <label class="skill" for="input-small">Item Name</label>
            <b-col>
                <b-form-input type="text" placeholder="Select Item" required></b-form-input>
            </b-col>
            <label class="skill" for="input-small">Quantity</label>
            <b-col>
                <b-form-input type="number" placeholder="Input Quantity" required></b-form-input>
            </b-col>
            <label class="skill" for="input-small">Receiver</label>
            <b-col>
                <b-form-input type="text" placeholder="Input Receiver" required></b-form-input>
            </b-col>
            <label class="skill" for="input-small">Contact Person</label>
            <b-col>
                <b-form-input type="text" placeholder="Input Contact Person" required></b-form-input>
            </b-col>
            <label class="skill" for="input-small">Contact Number</label>
            <b-col>
                <b-form-input type="text" placeholder="Input Contact Number of Contact Person" required></b-form-input>
            </b-col>
          </b-row>
          <b-button @click="showModal = !showModal" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Donate
          </b-button>
        </b-container>
        <b-modal v-model="showModal" size="xl">
        <b-container fluid>
              <h1 style="font-family:'Bebas Neue', cursive; text-align:center;">
                  Are you sure with all the details?
              </h1>
              <!-- <b-row>
                <b-col cols="5"></b-col>
                <b-col>
                  <b-button type="submit" variant="success">Yes</b-button>
                  &nbsp;
                  <b-button type="reset" variant="danger">No</b-button>
                </b-col>
              </b-row> -->
          </b-container>
      </b-modal>
      </b-card>
    </div>
  </div>
</template>

<script>
// const axios = require('axios').default

export default {
  name: 'Register',
  data () {
    return {
      skill: '',
      description: '',
      showModal: false,
      selected: null,
      optionz: [
        { value: null, text: 'Please select the unit of measurement' },
        { value: 'a', text: 'gal' },
        { value: 'b', text: 'lb' },
        { value: 'b', text: 'ft' }
      ],
      options: ['Food', 'Apparel', 'School Supply', 'Material'],
      search: '',
      value: []
    }
  },
  methods: {
    onOptionClick ({ options, addTag }) {
      addTag(options)
      this.search = ''
    }
  },
  computed: {
    criteria () {
      // Compute the search criteria
      return this.search.trim().toLowerCase()
    },
    availableOptions () {
      const criteria = this.criteria
      // Filter out already selected options
      const options = this.options.filter(opt => this.value.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1)
      }
      // Show all options available
      return options
    },
    searchDesc () {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    }
  }
}
</script>

<style scoped>
.addskill {
position: relative;
}
.addskill:before {
background-image: url('https://rs.projects-abroad.ie/v1/hero/product-5b5b2f57d7d1b.[1600].jpeg');
content: ' ';
display: block;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
opacity: 0.4;
background-repeat: no-repeat;
background-size: cover;
padding-top: 695px;
}
.skill, .description{
  padding: 8px;
  text-align: left;
  font-size: 14px;
}
</style>
