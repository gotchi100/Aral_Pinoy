<template>
    <footer id="footer">
        <div class="container">
            <b-container>
            <b-row>
            <b-col><p>
            Connect with Us
            </p>
            <Icon icon="logos:google-gmail" height="32"  style="margin: 20px;"/>
            <Icon icon="fa-brands:facebook" color="#1877f2" height="40"  style="margin: 20px;"/>
            <Icon icon="logos:twitter" color="#1877f2" height="35"  style="margin: 20px;"/>
            </b-col>
            <b-col><p>
            Location
            </p>
            <p>
            2339 Taft Ave, <br> Malate, Manila, 1004 <br> Metro Manila
            </p>
            </b-col>
            <b-col><p>
            Donate
            </p>
            <div class="donation">
            Bank of the Philippine Islands: ARAL PINOY ORG INC.
            PAYMAYA: ARAL PINOY ORG INC.<br>
            GCASH: ARAL PINOY ORG INC.
            </div>
            </b-col>
            </b-row>
            </b-container>
        </div>
    </footer>
</template>

<script>
import { Icon } from '@iconify/vue2'

export default {
  name: 'Footer',
  components: {
    Icon
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

#footer {
background: black;
background-size: cover;
color: #fff;
font-size: 14px;
text-align: center;
padding: 45px 0;
position: relative;
}
#footer::before {
content: "";
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.6);
}
#footer .container {
position: relative;
}
#footer p {
font-size: 25px;
padding: 0;
margin: 0 0 40px 0;
color: white;
font-family: 'Bebas Neue', cursive;
}
.donation {
font-family: 'Bebas Neue', cursive;
font-size: 24px;
text-align: right;
line-height: 1.5;
}
</style>
