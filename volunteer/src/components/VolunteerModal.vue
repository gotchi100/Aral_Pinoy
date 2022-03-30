<template>
  <modal
    name="example-resizable"
    :min-width="200"
    :min-height="500"
    :resizable="true"
    height="500"
    styles="border-radius: 8px;"
  >
    <div class="example-modal-content">
      <h1 style="font-family:'Bebas Neue', cursive; color: black; text-align: center; font-size: 50px; margin-top: 20px;">
        Batangas Coastal Cleanup
      </h1>
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <div>
              <p class="h5 mb-0">
                <b-icon icon="geo-alt" /> Tali Beach, Batangas
              </p>
              <p class="h5 mb-0">
                <b-icon icon="calendar" /> September 27 - October 12, 2021
              </p>
              <p class="h5 mb-0">
                <b-icon icon="clock" /> 6:30 AM - 5:30PM
              </p>
            </div>
          </b-col>
          <b-col>
            <div>
              <p class="h5 mb-0">
                <b-icon icon="people" /> Antonio Ingles
              </p>
              <p class="h5 mb-0">
                <b-icon icon="telephone" /> 0921 123 456
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <h3 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; margin-top: 10px; margin-left: 30px">
        Select a Role for the Event:
      </h3>
    </div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-button
            pill
            variant="danger"
            style="margin-top: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 200px; font-family: 'Noto Sans', cursive; text-transform: uppercase;"
          >
            Register
          </b-button>
        </b-col>
        <b-col>
          <b-button
            pill
            variant="danger"
            style="margin-top: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 200px; font-family: 'Noto Sans', cursive; text-transform: uppercase;"
          >
            Cancel
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </modal>
</template>

<script>
export default {
  name: 'VolunteerModal'
}
</script>

<style scoped>
.h5{
  font-family: 'Bebas Neue', cursive;
  text-align: left;
  line-height: 1.8;
  margin-left: 25px;
}
</style>
