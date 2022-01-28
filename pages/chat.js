import React, { useState } from "react";
import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from "@skynexui/components";
import appConfig from "../config.json";

export default function PaginaDoChat() {
  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);

  /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: "abreuermelinda",
      texto: novaMensagem,
    };

    setListaDeMensagens([mensagem, ...listaDeMensagens]);
    setMensagem("");
  }

  function handleDeleteMensagem(id) {
    const deleteMessage = listaDeMensagens.filter(
      (mensagem) => mensagem.id !== id
    );
    setListaDeMensagens(deleteMessage);
  }

  function handleDeleteMessage(id) {
    const deleteMessage = listaDeMensagens.filter(
      (mensagem) => mensagem.id !== id
    );
    setListaDeMensagens(deleteMessage);
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.neutrals[200],
        backgroundImage: `url(https://scontent.fbhz2-2.fna.fbcdn.net/v/t31.18172-8/15493507_1542365512446266_8294420951427726028_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeF1r9sT1x6uWJIt12U4raP3eh-mjcOCsoN6H6aNw4KygwE0ZtFlKToyh2SanrbmPcYB6S_LMiweYPMfmp43xdY-&_nc_ohc=1pxYXRwKH2oAX-Z6R5y&_nc_ht=scontent.fbhz2-2.fna&oh=00_AT8pTu8yuVRlaSSzAdoi1JxekGU5yvwnnex0aRG-OYIONQ&oe=62159165)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList
            mensagens={listaDeMensagens}
            handleDeleteMessage={handleDeleteMessage}
          />
          {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            >
              <Button
                type="button"
                variant="primary"
                colorVariant="neutral"
                label="X"
                onClick={(event) => {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }}
              />
            </TextField>
            <Button
              type="submit"
              variant="primary"
              colorVariant="neutral"
              label="OK"
              onClick={(event) => {
                event.preventDefault();
                handleNovaMensagem(mensagem);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log(props);

  const handleDeleteMessage = props.handleDeleteMessage;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Box
                styleSheet={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                  src={`https://github.com/abreuermelinda.png`}
                />
                <Text tag="strong">{mensagem.de}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Icon
                id={mensagem.id}
                onClick={() => {
                  handleDeleteMessage(mensagem.id);
                }}
                type="button"
                name="FaTrash"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  cursor: 'pointer',
                }}
              />
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
