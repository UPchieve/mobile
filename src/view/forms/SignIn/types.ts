import { FormikActions } from 'formik'

export interface SignInFormValues {
  email: string
  password: string
}

export interface IProps {
  onSubmit: (
    values: SignInFormValues,
    formikActions: FormikActions<SignInFormValues>
  ) => void
}
