import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import CreateCategoryForm from '@modules/categories/components/partials/CreateCategoryForm';

const CategoriesPage: NextPage = () => {
  return (
    <>
      <PageHeader title={Labels.Categories.CreateNewOne} />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Categories.Items, href: Routes.Categories.ReadAll },
          { name: Labels.Categories.NewOne },
        ]}
      />
      <CreateCategoryForm />
      {/* <CreateUserForm /> */}
    </>
  );
};

export default withAuth(
  withPermissions(CategoriesPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Categories,
        action: CRUD_ACTION.CREATE,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
