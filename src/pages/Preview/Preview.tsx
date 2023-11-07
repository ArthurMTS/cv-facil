import ReactToPrint from "react-to-print";

import { Header, RoundButton } from "@/components";
import PrinterIcon from "@/assets/icons/printer.svg";
import { TitleSection } from "./components";
import { CreateContext } from "@/contexts/create";
import { useContext } from "react";

export function Preview() {
  const {
    name,
    email,
    github,
    linkedin,
    resume,
    phone,
    competencies,
    profExp,
    certifications,
  } = useContext(CreateContext);

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
    <div className="bg-[#E5E5E5]  flex flex-col">
      <Header />
      <div
        className={`flex flex-col justify-center self-center items-center mt-[40px] relative ${
          name ? "w-full" : alert("faça um curriculo")
        }`}
      >
        <div
          id="CVElement"
          className="flex flex-col rounded-[5px] w-[70%] pt-[42px] pl-[38px]  mb-[38px] opacity-80"
        >
          <h1 className="flex text-[32px] font-bold basis-full justify-center">
            {name}
          </h1>
          <div className="flex flex-col text-[16px] font-normal opacity-100">
            <TitleSection>CONTATO</TitleSection>
            <span>Celular: {phone}</span>
            <span>Email: {email}</span>
            <span>
              Linkedin:{" "}
              <a href={linkedin} target="_blank">
                {linkedin}
              </a>
            </span>
            <span>
              Github:{" "}
              <a href={github} target="_blank">
                {github}
              </a>
            </span>
          </div>
          <div className="flex flex-col ">
            <TitleSection>RESUMO PROFISSIONAL</TitleSection>
            <span className="w-[90%]">{resume}</span>
          </div>
          <div className="flex flex-col ">
            <TitleSection>EXPERIÊNCIA PROFISSIONAL</TitleSection>
            <span>
              {profExp.map((item) => (
                <div>
                  <div className="flex flex-row gap-x-1">
                    <span>{item.start.month}</span>
                    <span>{item.start.year}</span>
                    <span>-</span>
                    <span>{item.end.month}</span>
                    <span>{item.end.year}</span>
                    <span className="font-bold">{item.title},</span>
                    <span>{item.city},</span>
                    <span>{item.state}</span>
                  </div>
                  <div>
                    <span className="w-[90%] flex">{item.description}</span>
                  </div>
                </div>
              ))}
            </span>
          </div>
          <div className="flex flex-col">
            <TitleSection>COMPETÊNCIAS</TitleSection>
            <div className="flex flex-row">
              <div className="flex flex-col mr-[50%]">
                {competencies.map((item) => (
                  <span>{item.title}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-[38px]">
            <TitleSection>CERTIFICAÇÕES</TitleSection>
            {certifications.map((item) => (
              <span>
                <span className="font-bold">{item.title},</span> {item.year}
              </span>
            ))}
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
