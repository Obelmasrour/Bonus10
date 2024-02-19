const setConfirmClassModifier = (hasErrors, classModifier = 'confirm') =>
  `${classModifier}${hasErrors ? ' disabled' : ' success'}`;

export default setConfirmClassModifier;
