import ReactToPrint from "react-to-print";

import { Header, RoundButton } from "@/components";
import PrinterIcon from "@/assets/icons/printer.svg";
import { TitleSection } from "./components";

export function Preview() {
  const handlePrint = () => {
    const printer = document.getElementById("CVElement");
    if (printer) {
      const cvPrint: any = window.open();
      cvPrint.document.write(printer.innerHTML);
      cvPrint.document.close();
      cvPrint.print();
    }
  };

  return (
    <div className="bg-[#E5E5E5] flex flex-col">
      <Header />
      <div className="flex flex-col justify-center self-center items-center mt-[40px] relative">
        <div
          id="CVElement"
          className="flex flex-col rounded-[5px] w-[70%] pt-[42px] pl-[38px]  mb-[38px] "
        >
          <h1 className="flex text-[32px] font-bold basis-full justify-center">
            Nome completo do usuário
          </h1>
          <div className="flex flex-col text-[16px] font-normal">
            <TitleSection>CONTATO</TitleSection>
            <span>Celular: (xx) x xxxx xxxx</span>
            <span>Email: name@mail.com</span>
            <span>Linkedin: www.linkedin.com/in/perfil</span>
            <span>Github: www.github.com/perfil</span>
          </div>
          <div className="flex flex-col ">
            <TitleSection>RESUMO PROFISSIONAL</TitleSection>
            <span className="w-[90%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              id velit sed lorem interdum bibendum ut quis libero. Proin
              scelerisque nisi ut quam egestas venenatis. Aliquam erat volutpat.
              Etiam scelerisque felis nec augue malesuada, quis cursus tellus
              rutrum. Nulla vitae elementum lectus. Class aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.{" "}
            </span>
          </div>
          <div className="flex flex-col ">
            <TitleSection>EXPERIÊNCIA PROFISSIONAL</TitleSection>
            <span>
              Mês ano - Mês ano <span className="font-bold">Título</span>,
              Cidade, Estado.{" "}
            </span>
            <span className="w-[90%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              id velit sed lorem interdum bibendum ut quis libero. Proin
              scelerisque nisi ut quam egestas venenatis. Aliquam erat volutpat.{" "}
            </span>
            <span className="w-[90%] mt-[10px]">
              Mês ano - Mês ano <span className="font-bold">Título</span>,
              Cidade, Estado.{" "}
            </span>
            <span className="w-[90%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              id velit sed lorem interdum bibendum ut quis libero. Proin
              scelerisque nisi ut quam egestas venenatis. Aliquam erat volutpat.{" "}
            </span>
          </div>
          <div className="flex flex-col">
            <TitleSection>COMPETÊNCIAS</TitleSection>
            <div className="flex flex-row">
              <div className="flex flex-col mr-[50%]">
                <span>Tecnologia A</span>
                <span>Tecnologia B</span>
                <span>Tecnologia C</span>
                <span>Tecnologia D</span>
              </div>
              <div className="flex flex-col">
                <span>Ferramenta A</span>
                <span>Ferramenta B</span>
                <span>Ferramenta C</span>
                <span>Ferramenta D</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-[38px]">
            <TitleSection>CERTIFICAÇÕES</TitleSection>
            <span>
              <span className="font-bold">Título,</span> Ano
            </span>
            <span>
              <span className="font-bold">Título,</span> Ano
            </span>
            <span>
              <span className="font-bold">Título,</span> Ano
            </span>
          </div>
        </div>
        <div className="flex justify-end w-[60%] mr-[13px] mb-[22px] bottom-10 right-0 drop-shadow-[5px_5px_4px_rgba(0, 0, 0, 0.25)]">
          <ReactToPrint
            trigger={() => (
              <RoundButton
                onClick={handlePrint}
                className="w-[50px] h-[50px] flex justify-center items-center "
              >
                <img
                  src={PrinterIcon}
                  alt="Botão representando uma impressora para imprimir ou baixar o curriculo feito"
                />
              </RoundButton>
            )}
            content={() => document.getElementById("CVElement")}
            pageStyle="@page {
              size: A4;
              margin: 10px;
            }"
          />
        </div>
      </div>
    </div>
  );
}
