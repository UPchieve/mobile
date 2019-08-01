import React, { FunctionComponent } from 'react';
import { Icon } from 'native-base';
import { Formik } from 'formik';
import { Button, Form, FormItem, Input } from '../../components';
import { getValidationSchema, initialValues, isEmailError } from './data';
import { IProps } from './types';

const SignInForm: FunctionComponent<IProps> = ({ onSubmit }) => (
	<Formik initialValues={initialValues} validationSchema={getValidationSchema} onSubmit={onSubmit}>
		{({ handleChange, handleSubmit, values: { email, password }, isSubmitting, touched, errors }) => (
			<Form style={{ justifyContent: 'center' }}>
				<FormItem error={isEmailError(touched, errors)}>
					<Input
						placeholder="Email"
						onChangeText={handleChange('email')}
						value={email}
						autoCapitalize="none"
						autoCorrect={false}
						style={styles.input}
					/>

					{isEmailError(touched, errors) && <Icon name="close-circle" />}
				</FormItem>
				<FormItem>
					<Input
						placeholder="Password"
						onChangeText={handleChange('password')}
						value={password}
						autoCapitalize="none"
						autoCorrect={false}
						secureTextEntry
						style={styles.input}
					/>
				</FormItem>
				<Button disabled={isSubmitting} onPress={handleSubmit} style={styles.button} block>
					{isSubmitting ? 'loading...' : 'Login'}
				</Button>
			</Form>
		)}
	</Formik>
);

const styles = {
	button: {
		marginTop: 20,
		width: '100%',
	},
	input: {},
};
export default SignInForm;
