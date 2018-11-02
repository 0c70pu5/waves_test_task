/* @flow */

import React from 'react';
import {connect} from 'react-redux';
import s from './list.styl';
import {bindActionCreators} from 'redux';
import {getUsers} from './actions';

type Props = {
  users: Array,
  getUsers: Function,
  history: Object
}

function mapStateToProps(state) {
  return {
    users: state.user.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsers
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class List extends React.Component<Props> {
  componentDidMount() {
    this.props.getUsers();
  }

  edit = (hash) => {
    if (hash) {
      this.props.history.push(`/${hash}`);
    } else {
      this.props.history.push('/add');
    }
  };

  render() {
    const {users} = this.props;
    const {edit} = this;

    return (
      <div className='layout__960'>
        <table className={s['list']}>
          <thead>
          <tr>
            <th>
              Полное имя
            </th>
            <th>
              День рождения
            </th>
            <th>
              Адрес
            </th>
            <th>
              Город
            </th>
            <th>
              Номер телефона
            </th>
          </tr>
          </thead>
          <colgroup>
            <col width='20%'/>
            <col width='20%'/>
            <col width='20%'/>
            <col width='20%'/>
            <col width='20%'/>
          </colgroup>
          <tbody>
          {
            users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className={s['list__empty']}
                >
                  Нет данных
                </td>
              </tr>
            )
          }
          {
            users.length > 0 && users.map((user) => (
              <tr key={user.hash}>
                <td>
                  {user.fullName}
                </td>
                <td>
                  {user.birthday}
                </td>
                <td>
                  {user.location}
                </td>
                <td>
                  {user.town}
                </td>
                <td>
                  {user.phone}
                </td>
              </tr>
            ))
          }
          <tr>
            <td colSpan={5}>
              <button
                onClick={() => edit()}
              >
                Создать пользователя
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
