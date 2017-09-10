import React from 'react';
import PropTypes from 'prop-types';

function HelloWorld(props) {
    const {name} = props;
    return (
        <div>
            Hello world from {name}
        </div>
    )
}

HelloWorld.propTypes = {
    name: PropTypes.string.isRequired
}

export default HelloWorld;