import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import appConfig from "../config.json";

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.secondary["200"]};
          font-size: 32px;
          font-weight: 600;
          padding-bottom: 25px;
        }
      `}</style>
    </>
  );
}

export default function PaginaDoChat() {
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals[100],
          backgroundImage:
            "url(https://media.giphy.com/media/1vLHnnIiwUN7a/giphy.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Titulo tag="h2">
            Ops! Sinto muito,o disco empenou e a página não foi encontrada!
          </Titulo>
          <Button
            type="submit"
            label="Voltar para a página inicial"            
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals["000"],
              mainColor: appConfig.theme.colors.secondary[400],
              mainColorLight: appConfig.theme.colors.secondary[500],
              mainColorStrong: appConfig.theme.colors.secondary[500],
            }}
            
            onClick={function goBack() {
              roteamento.push("/");
            }}
          />
        </div>
      </Box>
    </>
  );
}
