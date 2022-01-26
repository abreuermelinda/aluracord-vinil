import React, { useState } from "react";
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
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  const [username, setUserName] = useState("abreuermelinda");
  const [data, setData] = useState({});
  const roteamento = useRouter();

  const getData = async (user) => {
    await fetch(`https://api.github.com/users/${user}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };


  return (  
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals[100],
          backgroundImage:
            "url(https://scontent.fbhz2-2.fna.fbcdn.net/v/t31.18172-8/15493507_1542365512446266_8294420951427726028_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeF1r9sT1x6uWJIt12U4raP3eh-mjcOCsoN6H6aNw4KygwE0ZtFlKToyh2SanrbmPcYB6S_LMiweYPMfmp43xdY-&_nc_ohc=1pxYXRwKH2oAX-Z6R5y&_nc_ht=scontent.fbhz2-2.fna&oh=00_AT8pTu8yuVRlaSSzAdoi1JxekGU5yvwnnex0aRG-OYIONQ&oe=62159165)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: "rgb(0,0,0,0.75)",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              roteamento.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={(event) => {
                const sizeUserName = event.target.value;
                let size = sizeUserName.length;
                if (size > 2) {
                  setUserName(sizeUserName);
                } else setUserName();
                getData(sizeUserName);
              }}
              fullWidth 
              placeholder="Digite o seu usuário do Github"              
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.secondary[400],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              disabled={username < 3}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.secondary[400],
                mainColorLight: appConfig.theme.colors.secondary[500],
                mainColorStrong: appConfig.theme.colors.secondary[500],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>  
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {data.name}                         
            </Text>          
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {data.location}                         
            </Text>            
          
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
