/* @flow */

import React from 'react';
import classNames from 'classnames';
import cssModule from './select.styl';
import {
  dropDown,
  dropDownDefaultState
} from 'components/v0.2/abstract/drop-down';
import {
  list,
  listDefaultState
} from 'components/v0.2/abstract/list';
import type {
  DropDownState
} from 'components/v0.2/abstract/drop-down';
import type {
  ListState
} from 'components/v0.2/abstract/list';

type Option = {
  value: any,
  id: string | number,
  label: string
}

type Props = {
  value: Option,
  clear: Function,
  onChange: Function,
  disabled: boolean,
  options: Array,
  placeholder: string,
  cssModule: Object
}

type State = {
  ...DropDownState,
  ...ListState
}

class Simple extends list(dropDown(React.PureComponent))<Props, State> {

  static defaultProps = {
    disabled: false,
    cssModule
  };

  constructor(props) {
    super(props);

    this.state = {
      ...dropDownDefaultState,
      ...listDefaultState
    };
  }

  onSelect = (option) => {
    this.props.onChange(option);
  };

  render() {
    const {placeholder, disabled, clear, options, value, cssModule: s} = this.props;
    const {inFocus, focusedIndex} = this.state;
    const {setPushPadRef, pushPadKeyDown, mouseDownOnItem} = this;
    const listClasses = classNames(s['select__list'], {
      [s['select__list--hidden']]: !inFocus
    });

    return (
      <div
        className={s['select']}
        tabIndex={!disabled ? 1 : null}
        ref={setPushPadRef}
        onKeyDown={(e) => !disabled && pushPadKeyDown(e)}
        disabled={disabled}
      >
        <div
          className={s['select__selected']}
          disabled={disabled}
        >
          {
            !value && (
              <div className={s['select__placeholder']}>
                {placeholder}
              </div>
            )
          }
          {
            value && value.label
          }
        </div>
        {
          clear && (
            <i
              className={s['select__clear']}
              onClick={clear}
            />
          )
        }
        {
          options.length > 0 && (
            <ul
              className={listClasses}
            >
              {
                options.map((option, index) => {
                  const itemClasses = classNames(s['select__item'], {
                    [s['select__item--focus']]: focusedIndex === index,
                    [s['select__item--current']]: value && value.id === option.id
                  });
                  return (
                    <li
                      className={itemClasses}
                      key={option.id}
                      tabIndex={-1}
                      onMouseDown={mouseDownOnItem(option, index)}
                      onClick={(e) => {
                        e.target.blur();
                      }}
                    >
                      {option.label}
                    </li>
                  );
                })
              }
            </ul>
          )
        }
      </div>
    );
  }
}

export default Simple;
