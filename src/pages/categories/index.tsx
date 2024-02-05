import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';
import PageHeader from '@common/components/lib/partials/PageHeader';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import CategoriesTable from '@modules/categories/components/partials/CategoriesTable';
import { ROLE } from '@modules/permissions/defs/types';

const CategoriesPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <PageHeader
        title={Labels.Categories.ReadAll}
        action={{
          label: Labels.Categories.NewOne,
          startIcon: <Add />,
          onClick: () => router.push(Routes.Categories.CreateOne),
          permission: {
            entity: Namespaces.Categories,
            action: CRUD_ACTION.CREATE,
          },
        }}
      />
      <CustomBreadcrumbs
        links={[{ name: 'Dashboard', href: Routes.Common.Home }, { name: Labels.Categories.Items }]}
      />
      <CategoriesTable />
    </>
  );
};

export default withAuth(
  withPermissions(CategoriesPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Categories,
        action: CRUD_ACTION.READ,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
    forbidden: true,
    role: ROLE.USER,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
