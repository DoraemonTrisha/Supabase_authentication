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
import { LoginFormData } from "../types/types"; // Import login type
import { useAuth } from "@/context/auth-context"; // Import AuthContext

// Validation schema for login
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Login function using Supabase
const loginUser = async (data: LoginFormData) => {
  const { email, password } = data;

  const { data: sessionData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (sessionData?.session) {
    return sessionData.session; // Return the session data
  }

  throw new Error("Failed to authenticate.");
};

const Login: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { isAuthenticated, login } = useAuth(); // Get the authentication state

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirect to home if already logged in
    }
    setIsClient(true);
  }, [isAuthenticated, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (session) => {
      localStorage.setItem("auth_token", session.access_token); // Store the token
      localStorage.setItem("supabase_session", JSON.stringify(session)); // Store the full session
      toast.success("Login successful!");
      login(session.access_token); // Use context to update authentication state
      router.push("/"); // Redirect to home
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred during login.");
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data); // Trigger login mutation
  };

  if (!isClient) {
    return null; // Wait until the client is ready
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-black to-orange-500">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {loginMutation.isError && (
          <div className="text-red-600 mb-4">
            {loginMutation.error instanceof Error
              ? loginMutation.error.message
              : "An unexpected error occurred"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loginMutation.isPending}
              className="py-2"
            >
              {loginMutation.isPending ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Button onClick={() => router.push("/register")} variant="text" color="primary">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
