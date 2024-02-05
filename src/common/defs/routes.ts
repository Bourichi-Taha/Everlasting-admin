import Auth from '@modules/auth/defs/routes';
import Events from '@modules/events/defs/routes';
import Permissions from '@modules/permissions/defs/routes';
import Users from '@modules/users/defs/routes';
import Categories from '@modules/categories/defs/routes';

const Common = {
  Home: '/',
  NotFound: '/404',
};

const Routes = {
  Common,
  Auth,
  Permissions,
  Users,
  Events,
  Categories,
};

export default Routes;
