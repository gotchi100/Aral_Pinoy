<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card
            class="card"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <h1 style="font-family:'Bebas Neue', cursive;">
                    Create New Event
                  </h1>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12">
                  <b-container class="py-5">
                    <b-row>
                      <b-col
                        cols="12"
                        md="6"
                      >
                        <b-card
                          class="card"
                          style="border-radius: 20px; cursor: pointer"
                          @click="() => $router.push({ path: '/events/add' })"
                        >
                          <b-container fluid>
                            <b-row>
                              <b-col
                                cols="12"
                                mmd="6"
                              >
                                <h3 style="font-family:'Bebas Neue', cursive;">
                                  Create Blank Event
                                </h3>
                              </b-col>

                              <b-col
                                cols="12"
                                mmd="6"
                              >
                                Create an event to plan your work, house your documentation, and among other things.
                              </b-col>
                            </b-row>
                          </b-container>
                        </b-card>
                      </b-col>

                      <b-col
                        cols="12"
                        md="6"
                      >
                        <b-card
                          class="card"
                          style="border-radius: 20px; cursor: pointer"
                          @click="() => $router.push({ path: '/event-templates/select' })"
                        >
                          <b-container fluid>
                            <b-row>
                              <b-col cols="12">
                                <h3 style="font-family:'Bebas Neue', cursive;">
                                  Create from Template
                                </h3>
                              </b-col>

                              <b-col cols="12">
                                Create an event pre-populated with the necessary things to get you started quickly.
                              </b-col>
                            </b-row>
                          </b-container>
                        </b-card>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default ({
  name: 'EventPreAdd'
})
</script>
