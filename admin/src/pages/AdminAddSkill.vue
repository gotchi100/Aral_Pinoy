<template>
  <div>
    <div class="addskill">
      <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 950px; border-radius: 20px; margin-top: 40px;">
        <b-container fluid>
            <h1 style="font-family:'Bebas Neue', cursive;">
                Add a Skill
            </h1>
          <b-row class="my-1">
            <label class="skill" for="input-small">Skill Label</label>
            <b-col>
              <b-form-input v-model="skill"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <label class="description" for="input-small">Skill Description</label>
            <b-col>
              <b-form-input v-model="description"></b-form-input>
            </b-col>
          </b-row>
          <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;">
            Add Skill
          </b-button>
        </b-container>
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
      description: ''
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
