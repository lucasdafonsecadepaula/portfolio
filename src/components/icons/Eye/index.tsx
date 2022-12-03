const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={65}
    height={65}
    fill="none"
  >
    <path fill="url(#a)" d="M0 0h65v65H0z" />
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

export default SvgComponent;
