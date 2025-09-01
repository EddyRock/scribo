import { Card, CardContent, TextField, Button } from '@mui/material';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Link } from 'react-router';

const signUpSchema = z
  .object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(32, 'Password must be at most 32 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/,
        'Password must contain letters, numbers, and special symbols'
      ),
    confirmPassword: z.string()
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

  const onHandleSignUp = () => {
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card variant="outlined">
        <CardContent>
          <h3 className="text-2xl font-bold text-center">Create Account</h3>
          <p className="text-center text-sm text-gray-400 mb-4">Join us today and get started</p>

          <div className="w-full max-w-[400px] py-2">
            <TextField
              {...register('firstName')}
              margin="dense"
              label="First Name"
              variant="outlined"
              type="text"
              fullWidth
              className="!mb-2"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              {...register('lastName')}
              margin="dense"
              label="Second Name"
              variant="outlined"
              type="text"
              fullWidth
              className="!mb-2"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
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
              helperText={errors.confirmPassword?.message}
            />

            <div className="mt-4 flex flex-col items-end justify-between">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid}
                onClick={handleSubmit(onHandleSignUp)}>
                Sign Up
              </Button>
              <p className="w-full text-center text-gray-400 mt-4">
                Already have an account?
                <Button variant="text">
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
