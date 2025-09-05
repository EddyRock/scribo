import { Card, CardContent, TextField, Button } from '@mui/material';
import Logo from '@images/logo.png';

import { Link } from 'react-router';

import { useForm } from 'react-hook-form';
import { useFirebase, useNotifications } from '@/hooks';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import VALIDATIONS_FACTORY from '@/services/validations/validations-factory';

import type { IRootState } from '@/store';

const loginSchema = z.object({
  email: VALIDATIONS_FACTORY.email,
  password: VALIDATIONS_FACTORY.password
});
type LoginSchema = z.infer<typeof loginSchema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });
  const { signIn, signInWithGoogle } = useFirebase();
  const { showNotification } = useNotifications();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: IRootState) => state.auth);

  const onHandleLogin = async (data: LoginSchema) => {
    try {
      await signIn(data.email, data.password);
      showNotification('Login successful');
      navigate('/folders');
      reset();
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  const onHandleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      showNotification('Google login successful');
      navigate('/folders');
      reset();
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card variant="outlined">
        <CardContent>
          <img src={Logo} alt="Logo" className="w-20 h-20 mx-auto" />
          <h3 className="text-2xl font-bold text-center">Welcome back</h3>
          <p className="text-center text-sm text-gray-400">Sign in to your account</p>

          <div className="w-full max-w-[400px] py-2">
            <TextField
              margin="dense"
              label="Enter your email"
              variant="outlined"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              type="text"
              disabled={isLoading}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              helperText={errors.password?.message}
              error={!!errors.password}
              disabled={isLoading}
              {...register('password')}
            />

            <div className="mt-4 flex flex-col items-end justify-between">
              <Button variant="text" className="!mb-2" disabled={isLoading}>
                Forgot password?
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid}
                loading={isLoading}
                onClick={handleSubmit(onHandleLogin)}>
                Sign In
              </Button>
              <p className="w-full text-center text-gray-400 py-2">or</p>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                disabled={isLoading}
                onClick={onHandleGoogleLogin}>
                Continue with Google
              </Button>
              <p className="w-full text-center text-gray-400 mt-4">
                Don't have an account?
                <Button variant="text" disabled={isLoading}>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
