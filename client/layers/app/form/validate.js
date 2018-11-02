export function validate(values) {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Обязательное поле';
  } else if (values.fullName.length > 100) {
    errors.fullName = 'Не больше 100 символов';
  }

  if (!values.birthday) {
    errors.birthday = 'Обязательное поле';
  }

  return errors;
}
