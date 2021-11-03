<template>
   <div class="editsdg">
    <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
     <b-container fluid>
        <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: center;">Goal 4: Quality Education</h2>
        <b-img center src="https://sustainabledevelopment.un.org/content/sdgsummit/images/E_SDG%20goals_icons-individual-rgb-04.png" style="width: 150px; height:150px;" alt="Center image"></b-img>
        <b-card v-for="(role, index) in roles" :key="index" class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1200px; border-radius: 20px; margin-top:20px;">
          <b-row>
            <b-col>
              <b-form-input style="width:1000px;" v-model="role.question" disabled placeholder="Enter your Question"></b-form-input>
            </b-col>
            <b-col>
              <b-button>Delete</b-button>
            </b-col>
          </b-row>
        </b-card>
        <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1200px; border-radius: 20px; margin-top:20px;">
          <b-row>
            <b-col>
              <b-form-input style="width:1000px;" v-model="form.question" placeholder="Enter your Question"></b-form-input>
            </b-col>
            <b-col>
              <b-button>Delete</b-button>
            </b-col>
          </b-row>
        </b-card>
        <b-row>
          <b-col cols="10">
          </b-col>
          <b-col>
            <b-button style="margin-top:20px;" @click="addRole">Add Row</b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-col>
        <b-button pill variant="danger" to="dashboard" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 125px;">Save</b-button>
      </b-col>
   </b-card>
   </div>
</template>

<script>

export default ({
  data () {
    return {
      isDisabled: false,
      form: {
        question: ''
      },
      roles: []
    }
  },
  methods: {
    addRole () {
      this.roles.push({
        question: this.form.question
      })

      this.form.question = ''
    }
  }
})
</script>

<style scoped>
.editsdg {
position: relative;
}
.editsdg:before {
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
</style>
