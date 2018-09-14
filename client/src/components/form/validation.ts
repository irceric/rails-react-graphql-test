export const required = (value: any) => (value ? undefined : "can't be blank");

export const isPhoneNumber = (value: any) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const isEmail = (value: any) =>
  value &&
  !value.match(
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  )
    ? 'Invalid Email'
    : undefined;

export const minLength = (value: any) =>
  value && value.length < 6 ? '6 characters minimum' : undefined;

export const composeValidators = (...validators: Array<any>) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
