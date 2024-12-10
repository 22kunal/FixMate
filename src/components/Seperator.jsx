import React from 'react';

const Seperator = ({ height = 0, width = 0, ...extraProps }) => (
    <div style={{ height, width, ...extraProps }} />
);

export default Seperator;