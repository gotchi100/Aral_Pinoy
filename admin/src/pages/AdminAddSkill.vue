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
              <b-form-input v-model="name"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <label class="description" for="input-small">Skill Description</label>
            <b-col>
              <b-form-input v-model="description"></b-form-input>
            </b-col>
          </b-row>

          <b-button
            pill
            variant="danger"
            style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;"
            :disabled="isAdding"
            @click="addSkill"
          >
            <b-spinner v-if="isAdding"></b-spinner>
            <span v-else>Add Skill</span>
          </b-button>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const axios = require('axios').default

export default {
  name: 'AddSkill',
  data () {
    return {
      name: '',
      description: '',
      isAdding: false
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    async addSkill () {
      this.isAdding = true

      try {
        await axios.post('http://localhost:3000/skills', {
          name: this.name,
          description: this.description
        }, {
          headers: {
            authorization: `Bearer ${this.token}`
          }
        })

        this.$router.push({
          path: '/skills'
        })
      } finally {
        this.isAdding = false
      }
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
