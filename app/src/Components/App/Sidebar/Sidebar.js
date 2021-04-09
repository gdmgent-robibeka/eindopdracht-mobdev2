import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';

const items = [
  {
    label: 'Cantuszalen',
    route: Routes.Venues.Index,
  },
  {
    label: 'Liederen',
    route: Routes.Songs.Index,
  },
  {
    label: 'Ad Pistums',
    route: Routes.Penalties.Index,
  },
];

const Sidebar = () => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {items.map((item) => (
            <li className="nav-item" key={item.route}>
              <Link className="nav-link" to={item.route}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
