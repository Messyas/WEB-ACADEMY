"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginFormData {
  email: string;
  senha: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login bem-sucedido:", data);
    router.push("/");
  };

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem-vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control form-control-lg ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  {...register("email", {
                    required: "O email é obrigatório",
                  })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className={`form-control form-control-lg ${
                    errors.senha ? "is-invalid" : ""
                  }`}
                  id="senha"
                  {...register("senha", {
                    required: "A senha é obrigatória",
                    minLength: {
                      value: 6,
                      message: "A senha deve ter no mínimo 6 caracteres",
                    },
                  })}
                />
                {errors.senha && (
                  <span className="text-danger">{errors.senha.message}</span>
                )}
              </div>

              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success">
                  Entrar
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/cadastro" className="btn btn-link">
                  não tenho cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
