const intersect = {
  inserted(el, binding) {
    const value = binding.value;
    const { handler, options = {} } = value;

    const observer = new IntersectionObserver((entries = [], observer) => {
      if (!el._observe) return;

      if (handler && el._observe.init) {
        const isIntersecting = Boolean(
          entries.find((entry) => entry.isIntersecting)
        );

        if (isIntersecting) {
          handler(entries, observer, isIntersecting);
        }
      }

      el._observe.init = true;
    }, options);

    el._observe = { init: false, observer };

    observer.observe(el);
  },
  unbind(el) {
    if (!el._observe) return;

    el._observe.observer.unobserve(el);
    delete el._observe;
  },
};

export default intersect;
