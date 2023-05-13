import { createStore } from "vuex";
import { postModule } from "./postModule.js";

export default createStore({
  strict: true,
  modules: {
    post: postModule,
  },
});
