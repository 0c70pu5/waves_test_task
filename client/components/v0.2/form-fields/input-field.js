/* @flow */

import * as React from 'react';
import type {ConcreteFieldProps} from '../types.js';
import classNames from 'classnames';

function InputField({input, input: {value}, label, meta: {touched, error, active}, ...props}: ConcreteFieldProps) {
  const onChange = (e) => {
    return input.onChange(e.target.value, e);
  };

  const formGroup = classNames('form__group', {
    'form__group--has-value': !!value || active,
    'form__group--has-error': touched && !!error
  });

  return (
    <div className={formGroup}>
      <div className='form__label'>
        {label}
      </div>
      <div className='form__control'>
        <input
          type='text'
          {...props}
          tabIndex={1}
          {...input}
          value={value === null || value === undefined ? '' : value}
          onChange={onChange}
        />
        {
          touched && error && (
            <div className='form__error'>
              {error}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default InputField;
