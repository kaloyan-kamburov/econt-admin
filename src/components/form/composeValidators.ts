const composeValidators =
  (...validators: any[]) =>
  (value: string | number) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export default composeValidators;
