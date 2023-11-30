<template>
  <q-form @submit="onSubmit">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
        <q-btn
          color="teal"
          dense
          icon="save"
          label="Save"
          class="q-mx-md"
          type="submit"
        />

        <q-btn
          dense
          icon="delete"
          color="deep-orange"
          label="Delete"
          v-if="id"
          @click="useDelete"
        />
      </q-toolbar>
    </q-header>
    <q-input
      filled
      v-model="title"
      label="Title *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="director"
      label="Director *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />
    <q-input
      filled
      v-model="summary"
      label="Summary"
      lazy-rules
      type="textarea"
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-chip v-model:selected="genres.Drama" color="primary" text-color="white">
      Drama
    </q-chip>
    <q-chip v-model:selected="genres.Action" color="teal" text-color="white">
      Action
    </q-chip>
    <q-chip
      v-model:selected="genres.Animation"
      color="orange"
      text-color="white"
    >
      Animation
    </q-chip>
    <q-chip v-model:selected="genres['Sci-Fi']" color="red" text-color="white">
      Sci-Fi
    </q-chip>
  </q-form>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
} from "vue";
import { store } from "stores/movie";
import { generateID } from "src/utils/uuid";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "FormPage",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const $q = useQuasar();

    const id = ref(null);
    const title = ref("");
    const director = ref("");
    const summary = ref("");
    const genres = reactive({
      Drama: false,
      Action: false,
      Animation: false,
      "Sci-Fi": false,
    });

    const selectedGenres = computed(() => {
      return Object.keys(genres).filter((type) => genres[type] === true);
    });

    const useDelete = () => {
      store.delete(id.value);
      router.push("/");
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Deleted Done",
      });
    };

    const onSubmit = () => {
      const payload = {
        title: title,
        director: director,
        summary: summary,
        genres: selectedGenres,
      };

      if (id.value) {
        store.update(id.value, payload);
      } else {
        store.add({
          id: generateID(),
          ...payload,
        });
      }

      router.push("/");
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted",
      });
    };

    watch(
      () => route.params.id,
      async (newId) => {
        id.value = newId;
      }
    );

    onMounted(() => {
      const paramId = Number(route.params.id);
      if (paramId) {
        store.idOnView = Number(route.params.id);
        const selected = store.getDetail();

        id.value = paramId;
        title.value = selected[0].title;
        director.value = selected[0].director;
        summary.value = selected[0].summary;

        selected[0].genres.forEach((item) => (genres[item] = true));
      }
    });

    return {
      store,
      id,
      title,
      director,
      summary,
      genres,
      useDelete,
      onSubmit,
    };
  },
});
</script>
