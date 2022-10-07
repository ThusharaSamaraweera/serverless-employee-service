export default {
  type: "object",
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    city: { type: 'string' },
  },
  required: ['firstName', 'lastName', 'city'],
} as const;
