<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title> 21 Cinemax </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <ListMovie :lists="store.lists" />
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab to="view" icon="add" color="accent" />
  </q-page-sticky>
</template>

<script>
import { defineComponent } from "vue";
import ListMovie from "components/movie/ListMovie.vue";
import { store } from "stores/movie";

export default defineComponent({
  name: "IndexPage",
  components: {
    ListMovie,
  },
  setup() {
    return {
      store,
    };
  },
});
</script>
