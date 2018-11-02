/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import Option from 'helpers/option';
import {SimpleSelect} from 'components/v0.2/select/index';
import s from './date-3-field.styl';
import firstOrNull from 'helpers/first-or-null';

const yearOptions = Array.from({length: 100}, (value, index) => {
  const year = (new Date()).getFullYear() - index;
  return new Option({
    value: year,
    label: year.toString(),
    id: (index + 1)
  });
});
const monthOptions = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь'
].map((value, index) => {
  return new Option({
    value: index,
    label: value,
    id: (index + 1)
  });
});
const getDateOptions = (d) => {
  let date = d || new Date();
  return Array.from({
    length: new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  }, (value, index) => {
    return new Option({
      id: index + 1,
      label: index + 1,
      value: index + 1
    });
  });
};

type Label = {
  year: string,
  month: string,
  date: string
}

type Input = {
  onChange: Function,
  onBlur: Function,
  value: Date
}

type Props = {
  label: Label,
  input: Input
}

function getYear(date: Date) {
  if (date) {
    return date.getFullYear();
  }

  return null;
}

function getMonth(date: Date) {
  if (date) {
    return date.getMonth();
  }

  return null;
}

function getDate(date: Date) {
  if (date) {
    return date.getDate();
  }

  return null;
}

function Date3Field({input, input: {value, onChange}, label = '', placeholder = {}, meta: {touched, error, active}, ...props}: Props) {
  let dateTime = value;

  if (!dateTime) {
    dateTime = new Date();
    dateTime.setHours(23,59,59,999);
  }

  const onChangeDate = (dateOption) => {
    const newDate = new Date(dateTime.getTime());
    newDate.setDate(dateOption.value);
    console.log(newDate);
    return onChange(newDate);
  };

  const onChangeMonth = (monthOption) => {
    const newDate = new Date(dateTime.getTime());
    newDate.setMonth(monthOption.value);
    return onChange(newDate);
  };

  const onChangeYear = (yearOption) => {
    const newDate = new Date(dateTime.getTime());
    newDate.setYear(yearOption.value);
    return onChange(newDate);
  };

  const formGroup = classNames('form__group', {
    'form__group--has-value': !!value || active,
    'form__group--has-error': touched && !!error
  });

  const year = getYear(value);
  const month = getMonth(value);
  const date = getDate(value);

  const yearOption = firstOrNull(yearOptions, (option) => option.value === year);
  const monthOption = firstOrNull(monthOptions, (option) => option.value === month);
  const dateOption = firstOrNull(getDateOptions(value), (option) => option.value === date);

  return (
    <div className={formGroup}>
      <div className='form__label'>
        {label}
      </div>
      <div className='form__control'>
        <div className={s['container']}>
          <div className={s['container__item']}>
            <SimpleSelect
              {...props}
              tabIndex={1}
              {...input}
              label={label.year}
              value={yearOption}
              onChange={onChangeYear}
              options={yearOptions}
              placeholder={value && placeholder.year}
            />
          </div>
          <div className={s['container__item']}>
            <SimpleSelect
              {...props}
              tabIndex={1}
              {...input}
              label={label.month}
              value={monthOption}
              onChange={onChangeMonth}
              options={monthOptions}
              placeholder={value && placeholder.month}
            />
          </div>
          <div className={s['container__item']}>
            <SimpleSelect
              {...props}
              tabIndex={1}
              {...input}
              label={label.date}
              value={dateOption}
              onChange={onChangeDate}
              options={getDateOptions(value)}
              placeholder={value && placeholder.date}
            />
          </div>
        </div>
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

export default Date3Field;
