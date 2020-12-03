import React from 'react'

const Text = (props) => {
    const {size, children, bold, italic} = props;
    const Text = size;

    const style = {
        "fontWeight": !bold ?  null : "bold",
        "fontStyle": !italic ? null : "italic"
    };

    return (
    <Text style={style}>
      {children}
    </Text>
  )
}

export default Text;
