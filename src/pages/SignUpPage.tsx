import { Card, CardContent, TextField, Button } from '@mui/material';
import Logo from '@images/logo.png';

import { useForm } from 'react-hook-form';
import { useFirebase, useNotifications } from '@hooks/index';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import type { IRootState } from '@/store';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import VALIDATIONS_FACTORY from '@/services/validations/validations-factory';

import { Link } from 'react-router';

const signUpSchema = z
  .object({
    fullName: VALIDATIONS_FACTORY.name,
    email: VALIDATIONS_FACTORY.email,
    password: VALIDATIONS_FACTORY.password,
    confirmPassword: VALIDATIONS_FACTORY.password
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange'
  });
  const { signUp } = useFirebase();
  const { showNotification } = useNotifications();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: IRootState) => state.auth);

  const onHandleSignUp = async (data: SignUpSchema) => {
    try {
      await signUp(data.email, data.password, data.fullName);
      showNotification('Sign up successful');
      navigate('/folders');
      reset();
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card variant="outlined">
        <CardContent>
          <img src={Logo} alt="Logo" className="w-20 h-20 mx-auto" />
          <h3 className="text-2xl font-bold text-center">Create Account</h3>
          <p className="text-center text-sm text-gray-400 mb-4">Join us today and get started</p>

          <div className="w-full max-w-[400px] py-2">
            <TextField
              {...register('fullName')}
              margin="dense"
              label="Full Name"
              variant="outlined"
              type="text"
              fullWidth
              className="!mb-2"
              error={!!errors.fullName}
              disabled={isLoading}
              helperText={errors.fullName?.message}
            />
            <TextField
              {...register('email')}
              margin="dense"
              label="Email Address"
              variant="outlined"
              type="text"
              fullWidth
              className="!mb-2"
              error={!!errors.email}
              disabled={isLoading}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('password')}
              margin="dense"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              className="!mb-2"
              error={!!errors.password}
              disabled={isLoading}
              helperText={errors.password?.message}
            />
            <TextField
              {...register('confirmPassword')}
              margin="dense"
              label="Repeat Password"
              variant="outlined"
              type="password"
              fullWidth
              className="!mb-2"
              error={!!errors.confirmPassword}
              disabled={isLoading}
              helperText={errors.confirmPassword?.message}
            />

            <div className="mt-4 flex flex-col items-end justify-between">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid}
                loading={isLoading}
                onClick={handleSubmit(onHandleSignUp)}>
                Sign Up
              </Button>
              <p className="w-full text-center text-gray-400 mt-4">
                Already have an account?
                <Button variant="text" disabled={isLoading}>
                  <Link to="/login">Log in</Link>
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;
