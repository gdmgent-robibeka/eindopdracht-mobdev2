import Select from '../../../Design/Select';

const RoleSelect = (props) => {
  const options = [
    {
      value: 'admin',
      label: 'admin',
    },
    {
      value: 'user',
      label: 'user',
    },
  ];

  return <Select options={options} {...props} />;
};

export default RoleSelect;
