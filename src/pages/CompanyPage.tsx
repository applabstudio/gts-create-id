import React from 'react';
import CompanyList from 'src/components/CompanyList';

const CompanyPage: React.FC = () => {

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
        <CompanyList/>
    </div>
  );
  
};

export default CompanyPage;
