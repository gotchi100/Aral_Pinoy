<template>
   <div class="editsdg">
    <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
     <b-container fluid>
        <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; font-size: 20px; text-align: center;">Goal "Number": "Name of Goal"</h2>
        <b-img src="../assets/sdg1.png" fluid alt="Fluid image"></b-img>
        <b-card v-for="(role, index) in roles" :key="index" class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1200px; border-radius: 20px; margin-top:20px;">
          <b-row>
            <b-col>
              <b-form-checkbox>
              </b-form-checkbox>
            </b-col>
            <b-col>
              <b-form-input v-model="role.question" placeholder="Enter your Question"></b-form-input>
            </b-col>
            <b-col>
              <b-row>
                <b-col>
                1
                  <b-form-radio v-model="role.selected1" name="some-radios" value="1"></b-form-radio>
                </b-col>
                <b-col>
                2
                  <b-form-radio v-model="role.selected2" name="some-radios" value="2"></b-form-radio>
                </b-col>
                <b-col>
                3
                  <b-form-radio v-model="role.selected3" name="some-radios" value="3"></b-form-radio>
                </b-col>
                <b-col>
                4
                  <b-form-radio v-model="role.selected4" name="some-radios" value="4"></b-form-radio>
                </b-col>
                <b-col>
                5
                  <b-form-radio v-model="role.selected5" name="some-radios" value="5"></b-form-radio>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-button>Delete</b-button>
            </b-col>
          </b-row>
        </b-card>
        <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1200px; border-radius: 20px; margin-top:20px;">
          <b-row>
            <b-col>
              <b-form-checkbox>
              </b-form-checkbox>
            </b-col>
            <b-col>
              <b-form-input v-model="form.question" placeholder="Enter your Question"></b-form-input>
            </b-col>
            <b-col>
              <b-row>
                <b-col>
                1
                  <b-form-radio v-model="form.selected1" name="some-radios" value="1"></b-form-radio>
                </b-col>
                <b-col>
                2
                  <b-form-radio v-model="form.selected2" name="some-radios" value="2"></b-form-radio>
                </b-col>
                <b-col>
                3
                  <b-form-radio v-model="form.selected3" name="some-radios" value="3"></b-form-radio>
                </b-col>
                <b-col>
                4
                  <b-form-radio v-model="form.selected4" name="some-radios" value="4"></b-form-radio>
                </b-col>
                <b-col>
                5
                  <b-form-radio v-model="form.selected5" name="some-radios" value="5"></b-form-radio>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-button>Delete</b-button>
            </b-col>
          </b-row>
        </b-card>
        <b-row>
          <b-col>
          </b-col>
          <b-col>
            <b-button @click="addRole">Add Row</b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-col>
        <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 125px;">Save</b-button>
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
        question: '',
        selected1: '',
        selected2: '',
        selected3: '',
        selected4: '',
        selected5: ''
      },
      roles: []
    }
  },
  methods: {
    addRole () {
      this.roles.push({
        question: this.form.question,
        selected1: this.form.selected1,
        selected2: this.form.selected2,
        selected3: this.form.selected3,
        selected4: this.form.selected4,
        selected5: this.form.selected5
      })

      this.form.question = ''
      this.form.selected1 = ''
      this.form.selected2 = ''
      this.form.selected3 = ''
      this.form.selected4 = ''
      this.form.selected5 = ''
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
