export const formConfig = {
  editable: true,
  validations: {
    name: {
      minLength: 3,
      maxLength: 50,
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    linkedin: {
      pattern: /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.-]*(\?\S+)?)?)?$/,
    },
    pin: {
      pattern: /^\d{6}$/,
    },
  },
};
