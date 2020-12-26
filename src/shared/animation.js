export default {
  FADE_IN: {
    KEYFRAMES: [
      { opacity: 0, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    EASING: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  },
  SLIDE_TOP: {
    KEYFRAMES: [
      { transform: 'translateY(-10px)', opacity: 0 },
      { transform: 'translateY(0px)', opacity: 1 },
    ],
    EASING: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
}
