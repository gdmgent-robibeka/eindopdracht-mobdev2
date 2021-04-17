import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import AdminContainer from '../../Shared/Admin/AdminContainer';

const items = [
  {
    label: 'Venues',
    route: Routes.Venues.Index,
    admin: false,
  },
  {
    label: 'Songs',
    route: Routes.Songs.Index,
    admin: false,
  },
  {
    label: 'Penalties',
    route: Routes.Penalties.Index,
    admin: false,
  },
  {
    label: 'Users',
    route: Routes.Users.Index,
    admin: true,
  },
];

const Sidebar = () => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {items.map((item) => (
            <li className="nav-item" key={item.route}>
              {item.admin ? (
                <AdminContainer>
                  <Link className="nav-link" to={item.route}>
                    {item.label}
                  </Link>
                </AdminContainer>
              ) : (
                <Link className="nav-link" to={item.route}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
