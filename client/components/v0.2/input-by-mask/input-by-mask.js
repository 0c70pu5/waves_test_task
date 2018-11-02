import React from 'react';
import PropTypes from 'prop-types';
import createTextMaskInputElement from 'text-mask-core/src/createTextMaskInputElement.js';

class InputByMask extends React.PureComponent {
  static propTypes = {
    config: PropTypes.shape({
      mask: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        PropTypes.bool,
        PropTypes.shape({
          mask: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.func
          ]),
          pipe: PropTypes.func,
        }),
      ]).isRequired,
      guide: PropTypes.bool,
      validator: PropTypes.func
    }),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.inputRef = null;
    this.wrappedInput = null;
    this.setInputRef = this.setInputRef.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setInputRef(ref) {
    if (!ref) {
      return;
    }
    const {
      config
    } = this.props;

    this.inputRef = ref;
    this.wrappedInput = createTextMaskInputElement({
      inputElement: ref,
      ...config
    });
  }

  onChange({target: {value}}) {
    this.wrappedInput.update(value);
    this.props.onChange(this.wrappedInput.state.previousConformedValue);
  }

  render() {
    const {
      config,
      ...inputPropsTail
    } = this.props;

    const {
      setInputRef,
      onChange
    } = this;

    return (
      <input
        {...inputPropsTail}
        onChange={onChange}
        ref={setInputRef}
      />
    );
  }
}

export default InputByMask;
