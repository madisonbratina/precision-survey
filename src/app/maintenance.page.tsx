// app/maintenance.page.tsx

import React from 'react';

const Maintenance: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <h1>We're Currently Under Maintenance</h1>
      <p>
        Sorry for the inconvenience. We're performing some maintenance at the moment. Please check
        back later.
      </p>
    </div>
  );
};

export default Maintenance;
