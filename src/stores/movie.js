import { reactive } from "vue";
import { generateID } from "src/utils/uuid";

export const store = reactive({
  lists: [
    {
      id: generateID(),
      title: "Warkop DKI reborn",
      director: "Om Indro",
      summary: "Lorem ipsum lorem ipsum dolor sit amet",
      genres: ["Drama"],
    },
    {
      id: generateID(),
      title: "Wiro Sableng",
      director: "Dedi",
      summary: "Lorem ipsum lorem ipsum dolor sit amet",
      genres: ["Drama", "Action"],
    },
  ],
  getDetail() {
    return this.lists.filter((item) => item.id === this.idOnView);
  },
  update(id, item) {
    const i = this.lists.findIndex((val) => val.id === id);
    this.lists[i] = { ...this.getDetail()[0], ...item };
  },
  delete(id) {
    this.lists = this.lists.filter((item) => item.id !== id);
  },
  add(item) {
    this.lists.push(item);
  },
});
