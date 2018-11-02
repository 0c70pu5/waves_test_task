/* @flow */

import loDebounce from 'lodash/debounce';
import * as React from 'react';

export const dropDownDefaultState = {
  inFocus: false
};

export type DropDownState = {
  inFocus: boolean
}

export const dropDown = (S: React.Component | React.PureComponent) => class extends S {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

/*
  setState(newState: DropDownState) {
    throw new Error('Should be overridden');
  }

  get props() {
    throw new Error('Should be overridden');
  }
*/

  setPushPadRef = (ref) => {
    if (!ref) {
      return;
    }
    this.ref = ref;
    const handler = loDebounce((e) => {
      if (e.type === 'focus' && !this.props.disabled) {
        this.setState({
          inFocus: true
        });
      }
      if (e.type === 'blur' && !this.props.disabled) {
        this.setState({
          inFocus: false
        });
      }
    }, 10);
    this.ref.addEventListener('focus', handler, true);
    this.ref.addEventListener('blur', handler, true);
  };
};
