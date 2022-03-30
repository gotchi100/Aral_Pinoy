<template>
  <div>
    <b-container class="py-5">
      <b-row>
        <b-col cols="12">
          <b-card
            bg-variant="light"
            style="border-radius: 20px;"
          >
            <b-container fluid>
              <h2 style="font-family:'Bebas Neue', cursive; color: black; position: relative;">
                Monetary Donations Report
              </h2>
              <b-row class="my-1">
                <b-col style="margin-top:20px; margin-bottom:20px;">
                  <label
                    for="start-datepicker"
                    style="font-family: 'Bebas Neue', cursive;"
                  >From</label>
                  <b-form-datepicker
                    id="start-datepicker"
                    v-model="value"
                    class="mb-2"
                  />
                </b-col>
                <b-col style="margin-top:20px; margin-bottom:20px;">
                  <label
                    for="end-datepicker"
                    style="font-family: 'Bebas Neue', cursive;"
                  >To</label>
                  <b-form-datepicker
                    id="end-datepicker"
                    v-model="value"
                    :max="new Date()"
                    class="mb-2"
                  />
                </b-col>
              </b-row>
              <b-button
                pill
                variant="danger"
                style="margin: 12px; display: inline-block; font-size: 16px; padding: 8px; width: 225px;"
              >
                Generate Report
              </b-button>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ReportMonetaryDonations'
}
</script>
