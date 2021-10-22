<template>
  <div class="skillspage">
    <div class>
      <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
        <b-container fluid>
            <h2 style="font-family:'Bebas Neue', cursive;">
                SKILLS
            </h2>
            <b-row>
                <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:40px;">
                    <b-form-group style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                        <b-form-tags id="tags-with-dropdown" v-model="value" no-outer-focus class="mb-2" style="text-align:center;">
                        <template v-slot="{ tags, disabled, addTag, removeTag }" style="display: inline-block; height: 100%; overflow: auto;">
                            <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                <b-form-tag
                                @remove="removeTag(tag)"
                                :title="tag"
                                :disabled="disabled"
                                variant="info"
                                >{{ tag }}</b-form-tag>
                            </li>
                            </ul>

                            <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                            <template #button-content>
                                <b-icon icon="tag-fill"></b-icon> Skills Provided
                            </template>
                            <b-dropdown-form @submit.stop.prevent="() => {}">
                                <b-form-group
                                label="Search Skills"
                                label-for="tag-search-input"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="sm"
                                :description="searchDesc"
                                :disabled="disabled"
                                >
                                <b-form-input
                                    v-model="search"
                                    id="tag-search-input"
                                    type="search"
                                    size="sm"
                                    autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button
                                v-for="option in availableOptions"
                                :key="option"
                                @click="onOptionClick({ option, addTag })"
                            >
                                {{ option }}
                            </b-dropdown-item-button>
                            <b-dropdown-text v-if="availableOptions.length === 0">
                                There are no tags available to select
                            </b-dropdown-text>
                            </b-dropdown>
                        </template>
                        </b-form-tags>
                    </b-form-group>
                </b-card>
            </b-row>
            <b-row>
                <b-card class="card" style="display: inline-block; height: 100%; overflow: auto; width: 1300px; border-radius: 20px; margin-top:20px;">
                    <b-row>
                    <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative; text-align: left; font-size:20px; margin-top:15px; margin-bottom:0px;">Roles Needed:</h2>
                    <b-col>
                        <b-form-group label="Skill:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                        <b-form-input placeholder="Enter Specific Skill" required></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                    </b-col>
                    <b-form-group label="Description:" style="font-family:'Bebas Neue', cursive; text-align:left; margin-top:10px; margin-bottom:10px;">
                        <b-form-input placeholder="Enter Description of the Skill" required></b-form-input>
                    </b-form-group>
                    </b-row>
                    <b-row>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col>
                        <!-- <b-button style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 170px;">
                        Add Another Role
                        </b-button> -->
                    </b-col>
                    </b-row>
                </b-card>
                <b-row>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col>
                        <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 170px;">
                        Add skill
                        </b-button>
                    </b-col>
                    <b-col>
                        <b-button pill variant="danger" style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 170px;">
                        Delete skill
                        </b-button>
                    </b-col>
                    </b-row>
            </b-row>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>

export default ({
  data () {
    return {
      options: ['Teaches at Math', 'Fluent in English', 'Heavy Lifter', 'Playing the guitar'],
      search: '',
      value: [],
      data: []
    }
  },
  methods: {
    onOptionClick ({ option, addTag }) {
      addTag(option)
      this.search = ''
    },
    onChoicesClick ({ choices, addTag }) {
      addTag(choices)
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
    availableChoices () {
      const criteria = this.criteria
      const choices = this.choices.filter(opt => this.value.indexOf(opt) === -1)
      if (criteria) {
        // Show only options that match criteria
        return choices.filter(opt => opt.toLowerCase().indexOf(criteria) > -1)
      }
      // Show all options available
      return choices
    },
    searchDesc () {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    }
  }

})
</script>

<style scoped>
.skillspage {
position: relative;
}
.skillspage:before {
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
