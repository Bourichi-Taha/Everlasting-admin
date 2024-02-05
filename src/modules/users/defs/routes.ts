import { CrudRoutes } from '@common/defs/types';

const prefix = '/users';
const Routes: CrudRoutes = {
  ReadAll: prefix,
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
  UpdateProfile: '/profile/edit',
  ViewOne: '/profile/{id}',
  Profile: '/profile',
};

export default Routes;
