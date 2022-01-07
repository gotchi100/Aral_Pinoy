<template>
    <modal
        name="example"
        :min-width="200"
        :min-height="200"
        :resizable="true"
        height="500"
        styles="border-radius: 5px;"
    >
    <div class="example-modal-content">
        <div class="header">
            <h2 style="font-family:'Bebas Neue', cursive; color: black; text-align: left;">Payment Information</h2>
        </div>
        <h3 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; margin-top: 10px; margin-left: 30px">Donate Anonymously?</h3>
    </div>
    <div>
        <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
                v-model="selected"
                :options="options"
                :aria-describedby="ariaDescribedby"
                name="plain-inline"
                plain
                class="radio"
            >
            </b-form-radio-group>
        </b-form-group>
    </div>
    <b-row class="my-1">
        <label class="cardName" for="input-small">Name :</label>
        <b-col>
            <b-form-input v-model="cardName" style="width: 550px; display: inline-block;"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <label class="cardName" for="input-small">Amount :</label>
        <b-col>
            <b-form-input v-model="cardName" style="width: 550px; display: inline-block;"></b-form-input>
        </b-col>
    </b-row>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <b-button pill variant="danger" style="margin-top: 18px; display: inline-block; font-size: 16px; padding: 8px; width: 200px; font-family: 'Noto Sans', cursive; text-transform: uppercase;">
                    Donate
                </b-button>
            </b-col>
            <b-col>
                <b-button pill variant="danger" style="margin-top: 18px; display: inline-block; font-size: 16px; padding: 8px; width: 200px; font-family: 'Noto Sans', cursive; text-transform: uppercase;">
                    Cancel
                </b-button>
            </b-col>
        </b-row>
    </b-container>
    </modal>
</template>

<script>
export default {
  data () {
    return {
      selected: 'first',
      options: [
        { text: 'YES', value: 'first' },
        { text: 'NO', value: 'second' }
      ]
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #B6B6B6;
  padding: 5px 0px 2px;
  text-indent: 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.radio {
  font-family:'Bebas Neue', cursive;
  color: black;
  font-size: 20px;
}
.cardName {
  text-align: left;
  font-family:'Bebas Neue', cursive;
  color: black;
  font-size: 20px;
  text-indent: 30px;
  margin-bottom: 5px;
}
.cardNumber {
  text-align: left;
  font-family:'Bebas Neue', cursive;
  color: black;
  font-size: 20px;
  text-indent: 30px;
  margin-bottom: 5px;
  margin-right: 500px;
}
.visa {
  margin-left: 220px;
}
.mastercard, .paypal, .express {
  margin-left: 20px;
}
.month, .year, .cvc {
  text-align: left;
  font-family:'Bebas Neue', cursive;
  color: black;
  font-size: 20px;
  text-indent: 10px;
}
</style>
