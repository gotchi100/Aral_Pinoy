<template>
    <div>
        <Navbar />
        <RegistrationForm/>    
        </div>
</template>

<script>
import RegistrationForm from './Registration_Form.vue'
import Navbar from './Navbar.vue'

export default ({
  name: 'Registration_Page',
  components: {
    RegistrationForm,
    Navbar
  }
})
</script>
