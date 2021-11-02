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
        <h3 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; margin-top: 10px; margin-left: 30px">Select Payment Method:</h3>
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
    <h5 style="font-family:'Bebas Neue', cursive; color: black; text-align: left; margin-top: 10px; margin-left: 30px">Credit Card Payment</h5>
    <b-row class="my-1">
        <label class="cardName" for="input-small">Card Holder Name</label>
        <b-col>
            <b-form-input v-model="cardName" style="width: 550px; display: inline-block;"></b-form-input>
        </b-col>
    </b-row>
    <b-row class="my-1">
        <label class="cardNumber" for="input-small">Card Number
            <Icon class="visa" icon="logos:visa"/>
            <Icon class="mastercard" icon="logos:mastercard" height="32"/>
            <Icon class="paypal" icon="logos:paypal" color="blue" height="30"/>
            <Icon class="express" icon="fontisto:american-express" color="#2e77bb" height="30"/>
        </label>
        <b-col>
            <b-form-input v-model="cardNumber" style="width: 550px; display: inline-block;"></b-form-input>
        </b-col>
    </b-row>
    <b-container class="bv-example-row">
        <b-row>
            <b-col class="month">MM
              <b-form-input v-model="month"></b-form-input>
            </b-col>
            <b-col class="year">YY
              <b-form-input v-model="year"></b-form-input>
            </b-col>
            <b-col class="cvc">CVC
              <b-form-input v-model="cvc"></b-form-input>
            </b-col>
        </b-row>
    </b-container>
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
import { Icon } from '@iconify/vue2'

export default {
  components: {
    Icon
  },
  data () {
    return {
      selected: 'first',
      options: [
        { text: 'CREDIT CARD', value: 'first' },
        { text: 'PAYMAYA QR', value: 'second' },
        { text: 'BPI BANK TRANSFER', value: 'third' }
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
