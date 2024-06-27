import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/authSchemas";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "../../services/axiosConfig";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "all",
  });

  const registerMutaion = useMutation({
    mutationKey: ["signup"],
    mutationFn: (newUser: SignupFormData) => {
      return axios.post("/api/auth/register", newUser);
    },
  });

  const onSubmit = (data: SignupFormData) => {
    registerMutaion.mutateAsync(data).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-5">Signup</h2>
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
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {registerMutaion.isError && (
          <p className="text-red-500 text-sm">
            {registerMutaion.error instanceof AxiosError &&
              registerMutaion.error.response?.data.message}
          </p>
        )}
        <button
          type="submit"
          disabled={registerMutaion.isPending}
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ${
            registerMutaion.isPending ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {registerMutaion.isPending ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
