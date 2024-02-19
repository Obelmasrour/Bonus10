import { setResponseError } from '../setResponseError.js';

describe('setResponseError', () => {
  it('should handle missing anomaly field', () => {
    const response = {
      anomaly: undefined,
      status: 400,
    };

    const result = setResponseError({ response });

    expect(result).toEqual({
      label: 'Erreur: La syntaxe de la requête est erronée',
      detail: '',
      type: 'danger',
      iconName: 'alert',
    });
  });

  it('should handle anomaly field with custom values', () => {
    const response = {
      anomaly: {
        label: 'Custom Error',
        detail: 'Some details',
        type: 'customType',
        iconName: 'customIcon',
      },
      status: 500,
    };

    const result = setResponseError({ response });

    expect(result).toEqual({
      label: 'Custom Error',
      detail: 'Some details',
      type: 'customType',
      iconName: 'customIcon',
    });
  });

  it('should handle anomaly field with empty values', () => {
    const response = {
      anomaly: {
        label: '',
        detail: '',
        type: '',
        iconName: '',
      },
      status: 404,
    };

    const result = setResponseError({ response });

    expect(result).toEqual({
      label: '',
      detail: '',
      type: 'danger',
      iconName: 'alert',
    });
  });
});

