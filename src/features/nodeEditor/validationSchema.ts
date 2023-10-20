import * as yup from 'yup';

export const schemaNodeConfiguration = yup.object().shape({
  users: yup.array()
    .of(yup.object().shape({
      email: yup
        .string()
        .required('Email is required'),
    })),
});
