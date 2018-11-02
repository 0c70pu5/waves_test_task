/* @flow */

import React from 'react';
import s from './form.styl';
import {bindActionCreators} from 'redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {validate} from './validate';
import {InputField, Date3Field, InputByMaskField} from 'components/v0.2/form-fields/index';
import {getUserByHash, saveUser} from './actions';
import {formNames} from 'constants/form';

function mapStateToProps(state) {
  return {
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserByHash,
    saveUser
  }, dispatch);
}

type Props = {
  handleSubmit: Function,
  match: Object,
  history: Object,
  getUserByHash: Function,
  saveUser: Function
}

@reduxForm({
  form: formNames.USER_FORM,
  validate
})
@connect(mapStateToProps, mapDispatchToProps)
class Form extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.onSubmit = props.handleSubmit(this.onSubmit.bind(this));
  }

  componentDidMount() {
    const {hash} = this.props.match.params;
    if (hash) {
      this.props.getUserByHash(hash);
    }
  }

  onSubmit(values) {
    return this.props.saveUser(values);
  }

  render() {
    return (
      <div className='layout__570'>
        <div className={s['user']}>
          <div className={s['user__header']}>
            Пользователь
          </div>
          <form
            onSubmit={this.onSubmit}
            className='form'
            method='post'
            noValidate={true}
            autoComplete='off'
          >
            <Field
              name='fullName'
              component={InputField}
              label='Ф.И.О.'
              placeholder='Полное имя'
            />
            <Field
              name='birthday'
              component={Date3Field}
              label='Укажите день рождения'
              placeholder={{
                date: 'Укажите день',
                month: 'Укажите месяц',
                year: 'Укажите год'
              }}
            />
            <Field
              name='location'
              component={InputField}
              label='Укажите адрес'
            />
            <Field
              name='town'
              component={InputField}
              label='Укажите город'
            />
            <Field
              name='phone'
              component={InputByMaskField}
              label='Введите номер телефона'
              mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            />
            <input
              type='submit'
              className='form__submit'
              value='Добавить'
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
