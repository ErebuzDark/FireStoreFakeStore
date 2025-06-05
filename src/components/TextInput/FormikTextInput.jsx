import { useField } from 'formik';
import { TextInput, Label } from 'flowbite-react';

const FormikTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      <TextInput
        {...field}
        {...props}
        color={meta.touched && meta.error ? 'failure' : undefined}
        className={`rounded-[0.6rem] ${
          meta.touched && meta.error ? 'border-2 border-red-500' : ''
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-xs text-red-500 -mt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikTextInput;
