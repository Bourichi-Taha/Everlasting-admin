import { useFormContext, Controller } from 'react-hook-form';
import { Slider, SliderProps, FormHelperText } from '@mui/material';

type Props = SliderProps & {
  name: string;
  helperText?: React.ReactNode;
};

const RHFSlider = ({ name, helperText, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
};

export default RHFSlider;
