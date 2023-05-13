export default {
  mounted(el, binding) {
    if (typeof binding.value !== "function") {
      throw Error("Binding.value is not a function");
    }
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: "intersection",
};
