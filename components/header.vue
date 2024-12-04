<template>
  <div class="header" :class="{ 'white-bg': isScrolled || trans == -1 }">
    <div class="nav-container">
      <div class="nav-left">
        <NuxtLink :to="localePath('index')" class="nav-link">
          <img
            v-if="isScrolled || trans == -1"
            src="/static/img/logo.png"
            alt="Lookup-DNS"
            class="logo"
          />
          <img
            v-else
            src="/static/img/logo_white.png"
            alt="Lookup-DNS"
            class="logo"
          />
        </NuxtLink>
        <div class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="nav-right" :class="{ 'show-menu': isMenuOpen }">
        <a href="https://getmx.com" class="nav-link" target="_blank"
          >Domain-Email</a
        >
        <a href="https://pinmx.com" class="nav-link" target="_blank"
          >Generate-Email</a
        >
        <div class="dropdown">
          <button class="dropbtn">Language ▼</button>
          <div class="dropdown-content">
            <NuxtLink
              :to="switchLocalePath(item.language)"
              v-for="item in languageList"
              :key="item.language"
              >{{ item.title }}</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import config from "@/config/config";
import { getLanguageList } from "@/api/language";
const languageList = getLanguageList()

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

defineProps({
  trans: {
    type: Number as PropType<number>,
    default: -1,
  },
  path: {
    type: String as PropType<string>,
    default: "",
  },
});


const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenuOnResize = () => {
  if (window.innerWidth > 768) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", closeMenuOnResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", closeMenuOnResize);
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  padding: 20px 50px;
  color: #fff;
  z-index: 999;
  transition: all 0.3s ease;
}

.white-bg {
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  height: 60px;
  vertical-align: middle;
  margin-right: 20px;
}

.nav-link {
  color: inherit;
  text-decoration: none;
  margin: 0 20px;
  line-height: 60px;
  transition: color 0.3s ease-in-out;
  vertical-align: middle;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Muli', sans-serif;
}

.nav-link:hover {
  color: #007bff;
}

.dropdown {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}

.dropbtn {
  background-color: transparent;
  color: inherit;
  border: none;
  cursor: pointer;
  line-height: 1.5px;
  vertical-align: middle;
  transition: color 0.3s ease-in-out;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Muli', sans-serif;
}

.dropbtn:hover {
  color: #007bff;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 30px;
}
.dropdown-content::before {
  content: '';
  position: absolute;
  top: -10px;  /* 根据实际间距调整 */
  left: 0;
  width: 100%;
  height: 10px;  /* 与top值相同 */
  background-color: transparent;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
  color: #ff4800;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: currentColor;
  margin: 3px 0;
  transition: 0.4s;
}

@media (max-width: 768px) {
  .header {
    padding: 10px 0px;
  }

  .nav-container {
    flex-wrap: wrap;
  }

  .nav-left {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .logo {
    height: 40px;
  }

  .hamburger {
    display: flex;
  }

  .nav-right {
    display: none;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    background-color: transparent;
  }
  .nav-right.show-menu {
    display: flex;
  }

  .nav-link,
  .dropdown {
    margin: 5px 10px;
    font-size: 18px;
    line-height: 1.5;
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .dropdown-content a {
    padding: 10px;
    text-align: center;
  }
}
</style>
