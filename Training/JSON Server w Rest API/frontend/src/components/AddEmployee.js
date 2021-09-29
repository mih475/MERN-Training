import React from 'react';
import EmployeeForm from './EmployeeForm';

const AddEmployee = () => {
  const handleOnSubmit = (employee) => {
    console.log(employee);
  };

  return (
    <React.Fragment>
      <EmployeeForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddEmployee;