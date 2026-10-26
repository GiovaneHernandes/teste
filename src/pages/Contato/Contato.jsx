import { useRef, useState } from "react";
import {
  CONTATOS_COMERCIAL,
  CONTATO_EVENTOS,
  EMAIL_COMERCIAL,
  ENDERECO,
  TELEFONES_FIXOS,
  INSTAGRAM_URL,
} from "../../config/radio";
import "./Contato.css";

const IconeWhats = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.6-4.9A8.4 8.4 0 1 1 21 11.6z" />
    <path d="M8.9 9c.3 2.6 2.4 4.7 5 5l1-1.4 1.8.8" />
  </svg>
);

export default function Contato() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // Nome e mensagem em branco geravam um "Meu nome é -. Mensagem: -" do outro
  // lado. Os botões só liberam quando há o mínimo para a conversa fazer sentido.
  const podeEnviar = form.nome.trim() !== "" && form.mensagem.trim() !== "";

  // Sem rota de envio documentada: preparamos a mensagem para WhatsApp/e-mail,
  // nunca simulamos um envio real.
  function sendWhatsApp() {
    if (!formRef.current?.reportValidity()) return;
    const text = encodeURIComponent(
      `Olá! Meu nome é ${form.nome || "-"}. E-mail: ${form.email || "-"}. Mensagem: ${form.mensagem || "-"}`,
    );
    window.open(
      `https://wa.me/${CONTATOS_COMERCIAL[0].tel}?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function sendEmail() {
    if (!formRef.current?.reportValidity()) return;
    const subject = encodeURIComponent("Contato via site — Top FM");
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nE-mail: ${form.email}\nMensagem: ${form.mensagem}`,
    );
    window.location.href = `mailto:${EMAIL_COMERCIAL}?subject=${subject}&body=${body}`;
  }

  const linkEventos = "https://wa.me/" + CONTATO_EVENTOS.tel;
  const rotuloEventos =
    "WhatsApp de " + CONTATO_EVENTOS.nome + ": " + CONTATO_EVENTOS.telFormatado;

  return (
    <>
      <section className="tfm-page-hero">
        <div className="tfm-page-hero-inner">
          <h1 className="tfm-page-hero-title">Contato</h1>
          <p className="tfm-page-hero-lead">
            Comercial, eventos, sugestão de pauta ou pedido de música — o time
            atende de segunda a sexta, em horário comercial.
          </p>
        </div>
      </section>

      <section className="tfm-contato-page">
        <div className="tfm-contato-inner">
          {/* ================= Coluna de dados ================= */}

          <div className="tfm-contato-col">
            <div className="tfm-contato-sep">
              <h2 className="tfm-contato-sep-titulo">A emissora</h2>
              <span className="tfm-dial-rule" aria-hidden="true" />
            </div>

            {/* Lista de definição em vez de parágrafo com <br>: rótulo e valor
                ficam associados de verdade, e leitor de tela anuncia o par. */}
            <dl className="tfm-contato-dados">
              <dt>Endereço</dt>
              <dd>{ENDERECO}</dd>

              <dt>Telefones</dt>
              <dd>
                <span className="tfm-num">{TELEFONES_FIXOS}</span>
              </dd>

              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${EMAIL_COMERCIAL}`}>{EMAIL_COMERCIAL}</a>
              </dd>

              <dt>Instagram</dt>
              <dd>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @topfmbauru
                </a>
              </dd>

              <dt>Atendimento</dt>
              <dd>Segunda a sexta, horário comercial</dd>
            </dl>

            <div className="tfm-contato-sep">
              <h2 className="tfm-contato-sep-titulo">Comercial</h2>
              <span className="tfm-dial-rule" aria-hidden="true" />
            </div>

            <ul className="tfm-contato-lista">
              {CONTATOS_COMERCIAL.map((c) => {
                const link = "https://wa.me/" + c.tel;
                const rotulo = "WhatsApp de " + c.nome + ": " + c.telFormatado;

                return (
                  <li key={c.tel} className="tfm-contato-row">
                    <span className="tfm-contato-row-nome">{c.nome}</span>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tfm-contato-whats-btn"
                      aria-label={rotulo}
                    >
                      <IconeWhats />
                      <span className="tfm-num">{c.telFormatado}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="tfm-contato-sep">
              <h2 className="tfm-contato-sep-titulo">Eventos</h2>
              <span className="tfm-dial-rule" aria-hidden="true" />
            </div>

            <ul className="tfm-contato-lista">
              <li className="tfm-contato-row">
                <span className="tfm-contato-row-nome">
                  {CONTATO_EVENTOS.nome}
                </span>
                <a
                  href={linkEventos}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tfm-contato-whats-btn"
                  aria-label={rotuloEventos}
                >
                  <IconeWhats />
                  <span className="tfm-num">
                    {CONTATO_EVENTOS.telFormatado}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* ================= Formulário ================= */}

          <form
            className="tfm-contato-form"
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              sendWhatsApp();
            }}
          >
            <h2 className="tfm-contato-form-titulo">Enviar mensagem</h2>

            <p className="tfm-contato-hint">
              Sua mensagem é preparada para o WhatsApp ou para o seu programa de
              e-mail — nada é enviado automaticamente por aqui.
            </p>

            <div className="tfm-contato-field">
              <label htmlFor="contato-nome">Nome</label>
              <input
                id="contato-nome"
                required
                type="text"
                autoComplete="name"
                value={form.nome}
                onChange={(e) => setField("nome", e.target.value)}
              />
            </div>

            <div className="tfm-contato-field">
              <label htmlFor="contato-email">
                E-mail <span className="tfm-contato-opcional">opcional</span>
              </label>
              <input
                id="contato-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>

            <div className="tfm-contato-field">
              <label htmlFor="contato-msg">Mensagem</label>
              <textarea
                id="contato-msg"
                required
                rows={6}
                value={form.mensagem}
                onChange={(e) => setField("mensagem", e.target.value)}
              />
            </div>

            <div className="tfm-contato-actions">
              <button
                type="button"
                onClick={sendWhatsApp}
                disabled={!podeEnviar}
                className="tfm-contato-btn tfm-contato-btn-primary"
              >
                <IconeWhats />
                Enviar por WhatsApp
              </button>

              <button
                type="button"
                onClick={sendEmail}
                disabled={!podeEnviar}
                className="tfm-contato-btn tfm-contato-btn-secondary"
              >
                Enviar por e-mail
              </button>
            </div>

            {!podeEnviar && (
              <p className="tfm-contato-aviso" role="status">
                Preencha nome e mensagem para continuar.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
