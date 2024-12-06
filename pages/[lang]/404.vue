<template>
  <div>
    <Header />

    <section class="error-area">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-10 text-center">
            <div class="error-content">
              <div class="error-img mb-60">
                <img
                  src="/static/img/404.png"
                  alt="404"
                  style="width: 60%; height: auto"
                />
              </div>
              <h3 class="error-title">404 {{ $t('ye-mian-bu-cun-zai') }}</h3>
              <p class="error-text">
                {{ $t('dang-qian-ye-mian-yi-jing-xiu-gai-huo-shan-chu') }}
              </p>
              <nuxt-link to="/" class="error-btn"> {{ $t('fan-hui-shou-ye') }} </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer :black="1" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
useHead({
  title: `${t("ye-mian-bu-cun-zai")} - Lookup-DNS`,
});
</script>

<style scoped>
.error-area {
  padding: 80px 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  animation: fadeIn 0.8s ease-in-out;
  text-align: center;
}

.error-img {
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.error-img:hover {
  transform: scale(1.05);
}

.error-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
}

.error-text {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-btn {
  display: inline-block;
  padding: 12px 32px;
  background: #007bff;
  color: #fff;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.error-btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .error-title {
    font-size: 2rem;
  }

  .error-text {
    font-size: 1rem;
  }

  .error-area {
    padding: 60px 0;
  }
}
</style>
