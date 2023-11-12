import { Header, RoundButton } from "@/components";
import { InfoButton } from "@/components/InfoButton";
import { Input } from "@/components/Input/Input";
import { api } from "@/config/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validInfos = async (e: React.FormEvent) => {
    if(password===confirmPassword){
      e.preventDefault();

      try {
        await api.post("/users", {
          name,
          email,
          password,
        });
        navigate("/login");
      } catch (error) {
        alert("Erro no cadastro");
        console.error(error);
      }
    }else{
      alert("As senhas não coincidem")
    }
  };

  return (
    <div>
      <Header className="shadow-none bg-white" />
      <div
        className="h-[290px] w-[100vw] top-[0px] sm:absolute
        sm:h-[100vh] bg-[#FB4E4E] sm:w-[35%] min-w-[280px] relative right-0 flex text-white justify-center sm:items-center"
      >
        <div className="flex items-center flex-col text-center h-[60%]">
          <h1 className="font-bold decoration-white text-[40px] w-[250px] mb-[20px] sm:mt-[0] mt-[15px]">
            Olá, seja bem-vindo(a)
          </h1>
          <span className="mb-[30px] font-bold text-[20x] w-[250px]">
            Crie sua conta para assim poder criar seus currículos
          </span>
          <p className="font-bold text-[32px] cursor-pointer">Entrar</p>
        </div>
      </div>
      <div className="w-[100%] md:w-[65%] sm:w-[50%] flex justify-center">
        <form className="flex items-center flex-col" onSubmit={validInfos}>
          <h1 className="text-[30px] font-medium text-center mt-[50px] mb-[30px]">
            Crie sua conta
          </h1>
          <Input
            label="Nome completo"
            value={name}
            placeholder="Insira seu nome"
            onChange={(e) => setName(e.target.value)}
            pattern="[A-Za-z\s]+"
            required
            className="w-[300px]"
          />
          <Input
            label="E-mail"
            value={email}
            placeholder="Insira seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-[300px]"
          />
          <Input
            label="Senha"
            value={password}
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="w-[300px]"
          />
          <div className="relative">
            <InfoButton password={password} />
          </div>
          <Input
            label="Confirme sua senha"
            value={confirmPassword}
            placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
            className="w-[300px]"
          />
          <RoundButton className="mt-[30px] mb-[30px]">Cadastrar</RoundButton>
        </form>
      </div>
    </div>
  );
}
