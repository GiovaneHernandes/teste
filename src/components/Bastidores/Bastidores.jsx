import { useState } from "react";
import "./Bastidores.css";

// Fotos de bastidores: a equipe da Top FM com artistas em shows e eventos.
// Os arquivos ficam em public/ — para incluir uma foto, salve lá e
// acrescente uma linha aqui com um alt que descreva a cena.
//
// Qualquer arquivo que não exista some do mosaico sozinho (onError abaixo),
// então a lista pode citar fotos que ainda não foram enviadas sem que a
// página mostre retângulo quebrado.
const FOTOS = [
  {
    src: "/bastidores-01.jpg",
    alt: "Locutor da Top FM entrevista artista nos bastidores de um show",
  },
  {
    src: "/bastidores-02.jpg",
    alt: "Repórter da Top FM entrevista dupla sertaneja em evento",
  },
  { src: "/bastidores-03.jpg", alt: "Equipe da Top FM com cantor em camarim" },
  {
    src: "/bastidores-04.jpg",
    alt: "Entrevista da Top FM em painel de patrocinadores do evento",
  },
  {
    src: "/bastidores-05.jpg",
    alt: "Apresentadora da Top FM entrevista artista em evento",
  },
  {
    src: "/bastidores-06.jpg",
    alt: "Locutor da Top FM entrevista trio sertanejo nos bastidores",
  },
  {
    src: "/bastidores-07.jpg",
    alt: "Equipe da Top FM cumprimenta artista antes do show",
  },
  {
    src: "/bastidores-08.jpg",
    alt: "Repórter da Top FM entrevista cantores no backstage",
  },
  {
    src: "/bastidores-09.jpg",
    alt: "Entrevista da Top FM com artistas em evento da região",
  },
  { src: "/bastidores-10.jpg", alt: "Músico toca violão no estúdio da Top FM" },
  {
    src: "/bastidores-11.jpg",
    alt: "Convidada fala ao microfone no estúdio da Top FM",
  },
  {
    src: "/bastidores-12.jpg",
    alt: "Locutor da Top FM entrevista dupla sertaneja em camarim",
  },
  {
    src: "/bastidores-13.jpg",
    alt: "Equipe da Top FM entrevista artista em evento",
  },
  {
    src: "/bastidores-14.jpg",
    alt: "Repórteres da Top FM com cantor nos bastidores do show",
  },
];

export default function Bastidores({
  titulo = "Lembranças",
  descricao = "A equipe da Top FM nos camarins, nos shows da região e no estúdio, com os maiores nomes do sertanejo.",
  fotos = FOTOS,
}) {
  const [ausentes, setAusentes] = useState(() => new Set());
  const visiveis = fotos.filter((f) => !ausentes.has(f.src));

  if (!visiveis.length) return null;

  return (
    <section className="tfm-bastidores" aria-label={titulo}>
      <div className="tfm-bastidores-cabecalho">
        <h2 className="tfm-bastidores-titulo">{titulo}</h2>
        <p className="tfm-bastidores-descricao">{descricao}</p>
      </div>

      <div className="tfm-bastidores-mosaico">
        {visiveis.map((foto) => (
          <figure className="tfm-bastidores-item" key={foto.src}>
            <img
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              decoding="async"
              width="480"
              height="320"
              onError={() =>
                setAusentes((atual) => {
                  const proximo = new Set(atual);
                  proximo.add(foto.src);
                  return proximo;
                })
              }
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
