import { Card, CardContent, TextField, Button } from '@mui/material';

import Logo from '@images/logo.png';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Link } from 'react-router';

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/,
      'Password must contain letters, numbers, and special symbols'
    )
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

  const onHandleLogin = () => {
    reset();
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
              {...register('password')}
            />

            <div className="mt-4 flex flex-col items-end justify-between">
              <Button variant="text" className="!mb-2">
                Forgot password?
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid}
                onClick={handleSubmit(onHandleLogin)}>
                Sign In
              </Button>
              <p className="w-full text-center text-gray-400 py-2">or</p>
              <Button variant="outlined" color="primary" fullWidth>
                Continue with Google
              </Button>
              <p className="w-full text-center text-gray-400 mt-4">
                Don't have an account?
                <Button variant="text">
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
