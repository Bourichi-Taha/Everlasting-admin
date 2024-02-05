import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { CRUD_ACTION, Id } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import ProfilePage from '@modules/users/components/pages/ProfilePage';
import useUsers from '@modules/users/hooks/api/useUsers';
import useProgressBar from '@common/hooks/useProgressBar';
import { useEffect, useState } from 'react';
import { User } from '@modules/users/defs/types';
import { useRouter } from 'next/router';

const UserPage: NextPage = () => {
  const { readOne } = useUsers();
  const { start, stop } = useProgressBar();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const router = useRouter();
  const id: Id = Number(router.query.id);
  useEffect(() => {
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    const { data } = await readOne(id);
    if (data) {
      if (data.item) {
        setUser(data.item);
      }
    }
    setLoaded(true);
  };
  return (
    <>
      <PageHeader title="Mon Profile" />
      <CustomBreadcrumbs
        links={[{ name: 'Dashboard', href: Routes.Common.Home }, { name: 'Mon profile' }]}
      />

      {user && <ProfilePage item={user} />}
    </>
  );
};

export default withAuth(
  withPermissions(UserPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Users,
        action: CRUD_ACTION.UPDATE,
      },
      {
        entity: Namespaces.Users,
        action: CRUD_ACTION.READ,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
