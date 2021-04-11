import { useState } from 'react';
import Button from '../../../../Design/Button';
import Input from '../../../../Design/Input';

const Cantus = () => {
  const [studentUnion, setStudentUnion] = useState();

  const handleChange = (e) => {
    setStudentUnion(e.target.value);
  };

  return (
    <form>
      <div className="d-flex">
        <Input
          type="text"
          value={studentUnion}
          name="studentUnion"
          onChange={handleChange}
        />
      </div>

      <Button type="submit">Boek Cantus</Button>
    </form>
  );
};

export default Cantus;
