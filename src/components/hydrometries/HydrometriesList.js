import React from 'react';
import PropTypes from 'prop-types';

const HydrometryList = ({hydrometries}) => {  
  return (
      <ul className="list-group">
        {hydrometries.map(hydrometry => 
          <li className="list-group-item" key={ hydrometry._id }>
            { hydrometry.createdAt } -- inside: { hydrometry.inside_temperature } -- outside: { hydrometry.outside_temperature }
          </li>
        )}
      </ul>
  );
};

HydrometryList.propTypes = {  
  hydrometries: PropTypes.array.isRequired
};

export default HydrometryList;