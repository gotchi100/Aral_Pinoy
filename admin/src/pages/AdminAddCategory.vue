<template>
  <div>
    <div class="addskill">
      <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 950px; border-radius: 20px; margin-top: 40px;">
        <b-container fluid>
            <h1 style="font-family:'Bebas Neue', cursive;">
                Add a Category Entry
            </h1>
          <b-row class="my-1">
            <label class="skill" for="input-small">Category Name</label>
            <b-col>
              <b-form-input v-model="skill"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col>
                <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                    &nbsp; Requires Best Before Date?
                </b-form-checkbox>
            </b-col>
            <b-col>
                <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                    &nbsp; Requires Expiration Date?
                </b-form-checkbox>
            </b-col>
          </b-row>
          <b-button @click="showModal = !showModal" pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Add Category
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
      showModal: false
    }
  }
//   methods: {
//     async register () {
//       const token = this.$store.getters.token
//       await axios.post('http://localhost:3000/users', {
//         email: this.email,
//         password: this.password,
//         firstName: this.firstName,
//         lastName: this.lastName
//       }, {
//         headers: {
//           authorization: `Bearer ${token}`
//         }
//       })
//       this.$router.push({
//         path: '/officers'
//       })
//     }
//     }
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
