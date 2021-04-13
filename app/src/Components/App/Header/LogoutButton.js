import { useAuth } from '../../Auth/AuthProvider';
import Button from '../../Design/Button';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button color="outline-light" onClick={logout}>
      Afmelden
    </Button>
  );
};

export default LogoutButton;
