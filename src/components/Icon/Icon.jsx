const paths = {
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  left: <path d="m15 6-6 6 6 6" />,
  right: <path d="m9 6 6 6-6 6" />,
  play: <path d="m9 5 11 7-11 7Z" />,
  pause: (
    <>
      <path d="M8 5v14M16 5v14" />
    </>
  ),
  volume: (
    <>
      <path d="m11 5-5 4H2v6h4l5 4Z" />
      <path d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
    </>
  ),
  mute: (
    <>
      <path d="m11 5-5 4H2v6h4l5 4Z" />
      <path d="m16 9 6 6m0-6-6 6" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8" cy="8" r="1" />
      <path d="m3 17 5-5 4 4 4-6 5 7" />
    </>
  ),
  link: (
    <>
      <path d="m10 13 4-4m-6 7-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 0 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" />
    </>
  ),
};
export default function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
