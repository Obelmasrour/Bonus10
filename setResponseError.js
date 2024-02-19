export const STATUS_HTTP = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZE: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  SERVER_ERROR: 500,
};

export const STATUS_API = {
  SUCCESS: STATUS_HTTP.SUCCESS,
  CREATED: STATUS_HTTP.CREATED,
  WARNING: 40,
  ERROR: 50,
};

export const STATUS_HTTP_MESSAGES = {
  [STATUS_HTTP.SUCCESS]: 'Succès: La requête a réussi',
  [STATUS_HTTP.CREATED]: 'Succès: Création réussie',
  [STATUS_HTTP.BAD_REQUEST]: 'Erreur: La syntaxe de la requête est erronée',
  [STATUS_HTTP.UNAUTHORIZE]:
    'Erreur: Une authentification est nécessaire pour accéder à la ressource',
  [STATUS_HTTP.FORBIDDEN]: 'Erreur: Accès non autorisé',
  [STATUS_HTTP.NOTFOUND]: 'Erreur: Elément non trouvé',
  [STATUS_HTTP.SERVER_ERROR]:
    'Erreur: Problème technique ! Contacter votre support',
};

export const setResponseError = ({ response }) => {
  const { anomaly, status } = response;
  switch (true) {
    case `${status}`.startsWith(`${STATUS_API.WARNING}`):
      return {
        ...anomaly,
        label: anomaly?.label ?? STATUS_HTTP_MESSAGES[status],
        detail: anomaly?.detail ?? '',
        type: 'danger',
        iconName: 'alert',
      };
    case `${status}`.startsWith(`${STATUS_API.ERROR}`):
      return {
        ...anomaly,
        label: anomaly?.label ?? STATUS_HTTP_MESSAGES[status],
        detail: anomaly?.detail ?? '',
      };
    default:
      return {};
  }
};
