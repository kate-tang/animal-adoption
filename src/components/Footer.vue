<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="about-us">
          <div class="title-s">關於浪我回家</div>
          <p class="text">我們是一群喜愛小動物的志工，希望藉由這個平台，讓更多浪浪能夠有屬於自己的家</p>
          <div class="socials">
            <a href="#"><font-awesome-icon :icon="['fab', 'facebook-f']" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'google-plus-g']" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.footer {
  padding: 50px 0;
  background: $primary-color;
  color: #FFF;
}
.about-us {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
.socials {
  margin-top: 20px;
  a {
    color: #FFF;
    font-size: 20px;
    & + a{
      margin-left: 20px;
    }
  }
}
</style>