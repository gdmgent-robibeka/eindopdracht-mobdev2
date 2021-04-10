import { useState } from 'react';
import Button from '../../../../Design/Button';
import Input from '../../../../Design/Input';

const Cantus = () => {
  const [groupName, setGroupName] = useState();

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <form>
      <div className="d-flex">
        <Input
          type="text"
          value={groupName}
          name="groupName"
          onChange={handleChange}
        />
      </div>

      <Button type="submit">Boek Cantus</Button>
    </form>
  );
};

export default Cantus;
