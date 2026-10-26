import { PROMOCAO } from "../../config/radio";
import Img from "../Img/Img";
import Icon from "../Icon/Icon";
import "./PromoBand.css";
export default function PromoBand({
  etiqueta = PROMOCAO.etiqueta,
  titulo = PROMOCAO.titulo,
  texto = PROMOCAO.texto,
  cta = PROMOCAO.cta,
  href = PROMOCAO.href,
  imagem = PROMOCAO.imagem,
}) {
  return (
    <section className="tfm-promo" aria-label={etiqueta}>
      <div className="tfm-container tfm-promo-inner">
        <div className="tfm-promo-copy">
          <h2>{titulo}</h2>
          {texto && <p>{texto}</p>}
          {href && (
            <a
              className="tfm-promo-cta"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta}
              <Icon name="arrow" size={18} />
            </a>
          )}
        </div>
        {imagem && <Img src={imagem} alt="" className="tfm-promo-image" />}
      </div>
    </section>
  );
}
