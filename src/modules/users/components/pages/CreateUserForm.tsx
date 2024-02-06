import FormProvider, { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import RHFImageDropzone from '@common/components/lib/react-hook-form/RHFImageDropzone';
import Routes from '@common/defs/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROLES_OPTIONS } from '@modules/permissions/defs/options';
import { ROLE } from '@modules/permissions/defs/types';
import useUploads from '@modules/uploads/hooks/api/useUploads';
import { UserInputLabels } from '@modules/users/defs/labels';
import useUsers, { CreateOneInput } from '@modules/users/hooks/api/useUsers';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const CreateUserForm = () => {
  const router = useRouter();
  const { createOne: createOneUpload } = useUploads();
  const { createOne: createOneUser } = useUsers();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Le format de l'email est incorrect")
      .required('Le champ est obligatoire'),
    password: Yup.string(),
    username: Yup.string().required('Le champ est obligatoire'),
    role: Yup.mixed<ROLE>()
      .oneOf(Object.values(ROLE), (_values) => {
        return `Le champ doit avoir l'une des valeurs suivantes : ${ROLES_OPTIONS.map(
          (option) => option.label
        ).join(', ')}`;
      })
      .required('Le champ est obligatoire'),
    avatar: Yup.mixed().test('fileType', 'Format de fichier non valide', (value) => {
      if (!value) {
        return true; // No file provided, so no validation needed
      }
      const file = value as File;
      const acceptedFormats = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/svg',
        'image/webp',
      ]; // Add more formats as needed
      return acceptedFormats.includes(file.type);
    }),
  });

  const methods = useForm<CreateOneInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: CreateOneInput) => {
    if (data.avatar) {
      const dataUpload = { file: data.avatar };
      const uploadResponse = await createOneUpload(dataUpload);
      if (uploadResponse.success) {
        data.imageId = uploadResponse.data?.item.id;
      }
    }
    const response = await createOneUser(data, {
      displayProgress: true,
      displaySuccess: true,
    });
    if (response.success) {
      router.push(Routes.Users.ReadAll);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: '800px', margin: 'auto' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} columnSpacing={2} sx={{ padding: 5 }}>
            <Grid item sm={12}>
              <RHFImageDropzone name="avatar" label="Choisir un nouvel avatar" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="username" label={UserInputLabels.username} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="email" label={UserInputLabels.email} type="email" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFTextField name="password" label={UserInputLabels.password} type="password" />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <RHFSelect name="role" label="Rôle">
                {ROLES_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                startIcon={<LockOpen />}
                loadingPosition="start"
                loading={isSubmitting}
              >
                Créer
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </>
  );
};

export default CreateUserForm;
