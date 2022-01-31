import { useEffect, useState } from "react";
import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from "@skynexui/components";
import appConfig from "../../config.json";

export default function Profile({ username }) {
  const [error, setError] = useState(null);
  const [githubUser, setGithubUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getGithubInfo = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw new Error("Usuário não encontrado.");
      })
      .then((data) => {
        setGithubUser(data);
      })
      .catch((error) => {
        setError(error?.message || error);
        console.log(error?.message || error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    const timeoutId = setTimeout(() => {
      getGithubInfo(username);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [username]);

  if (loading) return <Text>Carregando...</Text>;

  if (error) return <Text>Usuário não encontrado</Text>;

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals[100],
          width: "100px",
          height: "auto",
        }}
        as="a"
        href={`https://github.com/${username}`}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            styleSheet={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              display: "inline-block",
            }}
            src={
              error
                ? "https://avatars.dicebear.com/api/pixel-art-neutral/aaaaaa.svg"
                : githubUser?.avatar_url
            }
          />
          <Text>{githubUser?.name}</Text>
          <Text>{githubUser?.location}</Text>
        </div>
      </Box>
    </>
  );
}
