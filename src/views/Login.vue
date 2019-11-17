<template>
  <div class="login">
    <b-jumbotron
      header="Vue.js Chat"
      lead="Chatkit SDKとBootstrap-Vueを使用したアプリケーション"
      bg-variant="info"
      text-variant="white"
    >
      <p>Chatkit SDKの詳細はウェブサイトをご覧ください</p>
      <b-btn target="_blank" href="https://pusher.com/chatkit">詳細</b-btn>
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col lg="4" md="3"></b-col>
        <b-col lg="4" md="6">
          <LoginForm />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'login',
  components: {
    LoginForm
  }
}
</script>
