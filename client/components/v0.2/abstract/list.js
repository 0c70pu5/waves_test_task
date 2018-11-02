/* @flow */

import * as React from 'react';

export const listDefaultState = {
  inFocus: false,
  focusedIndex: null
};

export type ListState = {
  inFocus: boolean,
  focusedIndex: number
}

export const eventKeyCodes = {
  tab: 9,
  enter: 13,
  escape: 27,
  space: 32,
  upArrow: 38,
  downArrow: 40
};

export const list = (S: React.Component | React.PureComponent) => class extends S {
/*
  setState() {
    throw new Error('Should be overridden');
  }

  get state() {
    throw new Error('Should be overridden');
  }

  get props() {
    throw new Error('Should be overridden');
  }

  onSelect = (option) => {
    throw new Error('Should be overridden');
  };
*/

  mouseDownOnItem = (option, index) => (e) => {
    const {disabled = false} = this.props;

    if (disabled) {
      return;
    }

    const {onSelect} = this;

    let isLeftClick = false;
    if ('buttons' in e) {
      isLeftClick = e.buttons === 1;
    } else {
      const button = e.which || e.button;
      isLeftClick = button === 1;
    }
    if (isLeftClick) {
      onSelect(option, e);
      this.setState({
        focusedIndex: index
      });
    }
  };

  moveCursor = (direction: 'top' | 'down', focusedIndex: number, options: Array) => {
    let computedIndex = focusedIndex;
    if (focusedIndex === null && options[0]) {
      computedIndex = 0;
    }
    else if (direction === 'top' && options[computedIndex - 1]) {
      --computedIndex;
    } else if (direction === 'down' && options[computedIndex + 1]) {
      ++computedIndex;
    }

    this.setState({
      focusedIndex: computedIndex
    });
  };

  pushPadKeyDown = (e) => {
    if (e.keyCode === eventKeyCodes.tab) {
      return e;
    }
    if (!this.state.inFocus && e.keyCode === eventKeyCodes.enter) {
      return e;
    }

    const {focusedIndex, inFocus} = this.state;
    const {options} = this.props;
    const {onSelect} = this;

    switch (e.keyCode) {
      case eventKeyCodes.upArrow: {
        if (!inFocus) {
          this.setState({
            inFocus: true
          });
        } else {
          this.moveCursor('top', focusedIndex, options);
        }
        e.preventDefault();
        return e;
      }
      case eventKeyCodes.downArrow: {
        if (!inFocus) {
          this.setState({
            inFocus: true
          });
        } else {
          this.moveCursor('down', focusedIndex, options);
        }
        e.preventDefault();
        return e;
      }
      case eventKeyCodes.space:
      case eventKeyCodes.enter: {
        if (Number.isInteger(focusedIndex) && focusedIndex >= 0) {
          onSelect(options[focusedIndex], e);
        }
        e.preventDefault();
        return e;
      }
      case eventKeyCodes.escape: {
        this.setState({
          inFocus: false
        });
        e.preventDefault();
        return e;
      }
    }
  };
};
