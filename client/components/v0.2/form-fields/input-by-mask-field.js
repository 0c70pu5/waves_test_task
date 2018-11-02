import React from 'react';
import PropTypes from 'prop-types';
import ReactTextMask from '../input-by-mask/input-by-mask';
import classNames from 'classnames';

function InputByMaskField({input, mask, clear, label, meta: {touched, error, active}, ...props}) {
  const formGroup = classNames('form__group', {
    'form__group--has-value': !!input.value || active,
    'form__group--has-error': touched && !!error
  });

  return (
    <div className={formGroup}>
      <div className='form__label'>
        {label}
      </div>
      <div className='form__control'>
        <ReactTextMask
          config={{
            mask
          }}
          className='form-control'
          {...props}
          {...input}
          tabIndex={1}
        />
        {
          touched && error &&
          <div className='form__error'>
            {error}
          </div>
        }
      </div>
    </div>
  );
}

InputByMaskField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  clear: PropTypes.func,
  mask: PropTypes.any,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  })
};

export default InputByMaskField;
