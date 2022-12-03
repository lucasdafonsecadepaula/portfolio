const BrazilianFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    fill="none"
  >
    <path fill="url(#a)" d="M0 0h19v19H0z" />
    <defs>
      <pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#b" transform="scale(.01)" />
      </pattern>
      <image
        id="b"
        width={100}
        height={100}
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default BrazilianFlag;
