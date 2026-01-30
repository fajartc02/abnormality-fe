<template>
  <div class="login-wrapper">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5" lg="4">
          <div class="login-card">
            <h4>Abnormality Dashboard - Login</h4>
            <CFormInput class="mb-4" type="text" v-model="noreg" label="Noreg" placeholder="0002340"
              text="Ex: 0002340" />
            <CFormInput type="password" v-model="password" label="Password" placeholder="xxxx" />
            <CButton color="primary" class="mt-4 w-100" @click="login">Login</CButton>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InputProblem',
  data() {
    return {
      noreg: "",
      password: "",
    }
  },

  methods: {
    async login() {
      try {

        const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, {
          noreg: this.noreg,
          password: this.password
        })

        localStorage.setItem('token', response.data.data.token)
        this.$router.push('/dashboard')

      } catch (error) {

      }
    }
  },
  components: {
  },
  async mounted() {
  }
}
</script>


<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.login-card {
  border-radius: 14px;
}
</style>
