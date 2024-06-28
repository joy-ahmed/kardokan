import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/authSchemas";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axiosConfig";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (user: LoginFormData) => {
      return axios.post("/api/auth/login", user);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutateAsync(data).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-5">Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {loginMutation.isError && (
          <p className="text-red-500 text-sm">
            {loginMutation.error instanceof AxiosError &&
              loginMutation.error.response?.data.message}
          </p>
        )}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ${
            loginMutation.isPending ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-center text-gray-500 mt-5">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default LoginForm;
