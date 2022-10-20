const SelectStyle = {
    option: (provided, state) => ({
      ...provided,
      color: "black",
      padding: 5,
      margin: "0px",
      background: "#e8e9e9",
      ":hover": {
        background: "#4472c7",
        color: "white",
      },
      boxShadow: "none",
    }),
    indicatorSeparator: () => ({
      border: "none",
      color: "black",
    }),
    dropdownIndicator: () => ({
      color: "black",
      paddingRight: ".5em",
    }),
    control: (provided, state) => ({
      ...provided,
      background: "#e8e9e9",
      margin: "10px 0px",
      border: "0px solid",
      borderRadius: "0px",
      outline: "none",
      boxShadow: "none",
    }),
    input: () => ({
      margin: "0px",
    }),
    menu: (provided, state) => ({
      ...provided,
      background: "#e8e9e9",
      margin: "5px 0px",
      borderColor: "#e8e9e9",
      borderRadius: "0px",
      padding: "0px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
  
      return { ...provided, opacity, transition };
    },
  };

  export default SelectStyle;