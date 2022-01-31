import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from "@skynexui/components";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import Popover from "@mui/material/Popover";
import Profile from "../src/components/Profile";

// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ4MDY0MywiZXhwIjoxOTU5MDU2NjQzfQ.fUQVTXVVy3CVc_nIOQ0RHBI1Xqz-HJXlpsAK61qD2iQ";
const SUPABASE_URL = "https://bwrqsynfwrzxqdstghjr.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function PaginaDoChat() {
  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        // console.log("Dados da consulta:", data);
        setListaDeMensagens(data);
        setLoading(false);
      });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      console.log("Nova mensagem:", novaMensagem);
      console.log("listaDeMensagens:", listaDeMensagens);
      // Quero reusar um valor de referencia (objeto/array)
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListaDeMensagens((valorAtualDaLista) => {
        console.log("valorAtualDaLista:", valorAtualDaLista);
        return [novaMensagem, ...valorAtualDaLista];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
      // id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        mensagem,
      ])
      .then(({ data }) => {
        console.log("Criando mensagem: ", data);
        setListaDeMensagens([data[0], ...listaDeMensagens]);
      });
    setMensagem("");
  }

  /* function handleDeleteMessage(id) {
    const deleteMessage = listaDeMensagens.filter(
      (mensagem) => mensagem.id !== id
    );
    setListaDeMensagens(deleteMessage);
  } */

  async function handleDeleteMessage(mensagemId) {
    await supabaseClient.from("mensagens").delete().match({ id: mensagemId });

    let novaListaDeMensagens = listaDeMensagens.filter((message) => {
      if (message.id != mensagemId) {
        return message;
      }
    });

    setListaDeMensagens([...novaListaDeMensagens]);
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
            loading={loading}
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
                marginTop: "10px",
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <Button
              type="submit"
              variant="primary"
              colorVariant="neutral"
              label="Enviar"
              onClick={(event) => {
                event.preventDefault();
                handleNovaMensagem(mensagem);
              }}
            />
            {/* CallBack */}
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                handleNovaMensagem(":sticker: " + sticker);
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
  const handleDeleteMessage = props.handleDeleteMessage;

  /* const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined; */

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
      {props.loading && (
        <Box
          styleSheet={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            styleSheet={{
              borderRadius: "30%",

              maxWidth: "500px",
              align: "center",
            }}
            alt="Carregando"
            src="vinyl.gif"
          />
        </Box>
      )}
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
                    cursor: "pointer",
                    hover: {
                      width: "100px",
                      height: "100px",
                      borderRadius: "10%",
                    },
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                  /* onClick={handleClick} */
                />

                {/* <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Profile username={mensagem.de} />
                </Popover> */}
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
                onClick={() => handleDeleteMessage(mensagem.id)}
                type="button"
                name="FaTrash"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  cursor: "pointer",
                }}
              />
            </Box>
            {/* [Declarativo] */}
            {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image
                styleSheet={{ width: "200px", height: "200px" }}
                src={mensagem.texto.replace(":sticker:", "")}
              />
            ) : (
              mensagem.texto
            )}
          </Text>
        );
      })}
    </Box>
  );
}
