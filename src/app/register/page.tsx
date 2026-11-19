"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import supabase from "@/config/supabaseClient";
import { RegisterFormData } from "../types/types"; 
import { useAuth } from "@/context/auth-context"; 

// Validation schema for registration
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required("Confirm password is required"),
});

// Register function using Supabase
const registerUser = async (data: RegisterFormData) => {
  const { email, password } = data;

  const { data: userData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (userData) {
    return userData; 
  }

  throw new Error("Failed to register.");
};

const Register: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth(); 

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); 
    }
    setIsClient(true);
  }, [isAuthenticated, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful!");
      router.push("/login"); 
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred during registration.");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    registerMutation.mutate(data); 
  };

  if (!isClient) {
    return null; // Wait until the client is ready
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-orange-500">
      <div className="bg-white bg-opacity-80 my-8 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>

        {registerMutation.isError && (
          <div className="text-red-600 mb-4">
            {registerMutation.error instanceof Error
              ? registerMutation.error.message
              : "An unexpected error occurred"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            className="rounded-md"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            className="rounded-md"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            className="rounded-md"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            className="rounded-md"
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            className="rounded-md"
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={registerMutation.isPending}
              className="py-2"
            >
              {registerMutation.isPending ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <Button onClick={() => router.push("/login")} variant="text" color="primary">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
