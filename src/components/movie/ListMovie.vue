<template>
  <q-input
    v-model="activeQuery"
    label="Search Movie"
    outlined
    class="q-mb-md"
  />

  <q-list bordered separator v-for="item in filtered" :key="item.id">
    <q-item
      clickable
      v-ripple
      :to="{ name: 'update', params: { id: item.id } }"
    >
      <q-item-section>
        <q-item-label overline>{{ item.title }}</q-item-label>
        <q-item-label>{{ item.director }}</q-item-label>
        <q-item-label caption>
          {{ item.summary }}
          <div class="q-pt-md q-gutter-x-md">
            <q-badge
              v-for="genre in item.genres"
              :key="item.title + genre"
              outline
              align="middle"
              color="teal"
            >
              {{ genre }}
            </q-badge>
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent, defineProps, ref, toRef, computed } from "vue";
import { wordFilter } from "utils/wordFilter";

const activeQuery = ref("");

export default defineComponent({
  name: "ListMovie",
  props: {
    lists: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const movies = toRef(props, "lists");

    const filtered = computed(() => {
      if (activeQuery.value === "") {
        return movies.value;
      }
      return movies.value.filter(
        (item) => wordFilter(item.title, activeQuery.value).length > 0
      );
    });

    return {
      movies,
      filtered,
      activeQuery,
    };
  },
});
</script>
