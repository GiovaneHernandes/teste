import { createElement, useMemo } from "react";
import { Link } from "react-router-dom";

const ALLOWED = new Set([
  "p",
  "div",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "blockquote",
  "br",
  "hr",
  "a",
  "img",
  "figure",
  "figcaption",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "pre",
  "code",
]);
const DROP = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "svg",
  "math",
  "template",
  "link",
  "meta",
]);
const HAS_MARKUP = /<\/?[a-z][^>]*>/i;

function safeUrl(value, image = false) {
  if (!value) return undefined;
  try {
    const url = new URL(value, window.location.href);
    return (image
      ? ["https:", "http:"]
      : ["https:", "http:", "mailto:", "tel:"]
    ).includes(url.protocol)
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

// Only known elements and explicitly selected attributes are translated to React.
// API HTML is never injected with dangerouslySetInnerHTML; handlers, CSS and active embeds are discarded.
function renderNode(node, key) {
  if (node.nodeType === 3) return node.textContent;
  if (node.nodeType !== 1) return null;
  let tag = node.tagName.toLowerCase();
  if (DROP.has(tag)) return null;
  if (tag === "h1") tag = "h2";
  const children = Array.from(node.childNodes).map((child, i) =>
    renderNode(child, `${key}-${i}`),
  );
  if (!ALLOWED.has(tag)) return children;
  const props = { key };
  if (tag === "a") {
    props.href = safeUrl(node.getAttribute("href"));
    if (!props.href) return children;
    const destination = new URL(props.href);
    if (destination.origin === window.location.origin) {
      return (
        <Link
          key={key}
          to={destination.pathname + destination.search + destination.hash}
        >
          {children}
        </Link>
      );
    }
    if (["https:", "http:"].includes(destination.protocol))
      props.target = "_blank";
    props.rel = "noopener noreferrer";
  }
  if (tag === "img") {
    props.src = safeUrl(node.getAttribute("src"), true);
    if (!props.src) return null;
    props.alt = node.getAttribute("alt") || "";
    props.loading = "lazy";
    props.decoding = "async";
    return createElement(tag, props);
  }
  if (tag === "br" || tag === "hr") return createElement(tag, props);
  if (tag === "th")
    props.scope = node.getAttribute("scope") === "row" ? "row" : "col";
  const element = createElement(tag, props, children);
  return tag === "table" ? (
    <div
      className="tfm-article-table"
      key={key}
      tabIndex={0}
      role="region"
      aria-label="Tabela da matéria"
    >
      {element}
    </div>
  ) : (
    element
  );
}
export function articleText(content) {
  if (!HAS_MARKUP.test(content)) return content;
  const doc = new DOMParser().parseFromString(content, "text/html");
  doc.querySelectorAll([...DROP].join(",")).forEach((node) => node.remove());
  return doc.body.textContent || "";
}
export default function ArticleContent({ content = "" }) {
  const nodes = useMemo(() => {
    if (!HAS_MARKUP.test(content))
      return content
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((text, i) => <p key={i}>{text}</p>);
    const doc = new DOMParser().parseFromString(content, "text/html");
    return Array.from(doc.body.childNodes).map((node, i) =>
      renderNode(node, String(i)),
    );
  }, [content]);
  return <div className="tfm-article-body">{nodes}</div>;
}
