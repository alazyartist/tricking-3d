const getStanceColor = (stance: string) => {
  const color = {
    Backside: `#07b9e9`,
    Backflip: `#07b9e9`,
    VertB: `#07b9e9`,
    Inside: `#06d8b7`,
    Insideflip: `#06d8b7`,
    Outside: `#10b35d`,
    Outsideflip: `#10b35d`,
    Frontside: `#003eb3`,
    Frontflip: `#003eb3`,
    VertF: `#003eb3`,
    BacksideComplete: `#7EE0FB`,
    Gainer: `#7EE0FB`,
    Lotus: `#75FBB3`,
    OutsideComplete: `#75FBB3`,
    Raiz: `#2db36c`,
    OutsideSemi: `#2db36c`,
    FrontsideSemi: `#2b5ab3`,
    WebsterR: `#2b5ab3`,
    FrontsideMega: `#4171ca`,
    Webster: `#4171ca`,
    InsideMega: `#40baa6`,
    Aerial: `#40baa6`,
    GMS: `#5ed8c5`,
    InsideHyper: `#5ed8c5`,
    GainerR: `#6bcee9`,
    BacksideHyper: `#6bcee9`,
  };
  return color[stance];
};

export { getStanceColor };
