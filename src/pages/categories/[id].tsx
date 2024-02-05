import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import { useRouter } from 'next/router';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useEffect, useState } from 'react';
import useProgressBar from '@common/hooks/useProgressBar';
import { CRUD_ACTION, Id } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import useCategories from '@modules/categories/hooks/api/useCategories';
import { Category } from '@modules/categories/defs/types';
import UpdateCategoryForm from '@modules/categories/components/partials/UpdateCategoryForm';

const CategoriesPage: NextPage = () => {
  const router = useRouter();
  const { start, stop } = useProgressBar();
  const { readOne } = useCategories();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState<null | Category>(null);
  const id: Id = Number(router.query.id);

  useEffect(() => {
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    if (id) {
      const { data } = await readOne(id);
      if (data) {
        if (data.item) {
          setItem(data.item);
        }
      }
      setLoaded(true);
    }
  };

  return (
    <>
      <PageHeader title={Labels.Categories.EditOne} />
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: Routes.Common.Home },
          { name: Labels.Categories.Items, href: Routes.Categories.ReadAll },
          { name: item ? item.name : Labels.Categories.EditOne },
        ]}
      />

      {item && <UpdateCategoryForm item={item} />}
    </>
  );
};

export default withAuth(
  withPermissions(CategoriesPage, {
    requiredPermissions: [
      {
        entity: Namespaces.Categories,
        action: CRUD_ACTION.UPDATE,
      },
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
