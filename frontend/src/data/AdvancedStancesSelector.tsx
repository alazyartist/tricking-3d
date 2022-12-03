const AdvancedStancesSelector = (props) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1080 1080"
      {...props}
    >
      <g id="Selector">
        <path
          id="BacksideHyper"
          className="fill-[#FFFFFF]"
          d="M1054.99,540.21H540.43l363.85-363.85h0.01
		C997.41,269.49,1054.99,398.13,1054.99,540.21z"
        />
        <path
          id="InsideHyper"
          className="fill-[#FFFFFF]"
          d="M904.28,176.36L540.43,540.21V25.65C682.51,25.65,811.15,83.23,904.28,176.36z"
        />
        <path
          id="InsideMega"
          className="fill-[#FFFFFF]"
          d="M540.43,25.65v514.56L283.15,282.93l-4.73-4.73L176.58,176.36v-0.01
		C269.7,83.23,398.34,25.65,540.43,25.65z"
        />
        <path
          id="FrontsideMega"
          className="fill-[#FFFFFF]"
          d="M540.43,540.21H25.87c0-142.08,57.58-270.72,150.71-363.85L278.42,278.2
		l4.73,4.73L540.43,540.21z"
        />
        <path
          id="FrontsideSemi"
          className="fill-[#FFFFFF]"
          d="M540.43,540.21L283.15,797.5L176.57,904.07
		c-93.12-93.12-150.7-221.76-150.7-363.86H540.43z"
        />
        <path
          id="OutsideSemi"
          className="fill-[#FFFFFF]"
          d="M540.43,540.21v514.57c-142.09,0-270.73-57.58-363.86-150.71L283.15,797.5
		L540.43,540.21z"
        />
        <path
          id="OutsideComplete"
          className="fill-[#FFFFFF]"
          d="M904.28,904.07c-93.12,93.12-221.76,150.71-363.85,150.71V540.21L797.71,797.5
		L904.28,904.07z"
        />
        <path
          id="BacksideComplete"
          className="fill-[#FFFFFF]"
          d="M1054.99,540.21c0,142.08-57.58,270.72-150.71,363.85L802.44,802.23
		l-4.73-4.73L540.43,540.21H1054.99z"
        />
      </g>
    </svg>
  );
};

export default AdvancedStancesSelector;
