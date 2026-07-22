import type { Formats } from 'ember-intl';

export const formats: Formats = {
  formatTime: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
  formatDate: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
  formatNumber: {
    EUR: {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    USD: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};
