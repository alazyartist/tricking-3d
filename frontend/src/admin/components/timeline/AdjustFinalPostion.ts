const adjustFinalPosition = (newElement, sd) => {
  for (const s of sd) {
    let offset;
    let durr = newElement.endTime - newElement.startTime;
    let sdurr = s.endTime - s.startTime;
    const frame = 1 / 30;

    if (newElement.id !== s.id) {
      // Check if the new element's start time is within the range of the existing element
      if (
        newElement.startTime >= s.startTime &&
        newElement.startTime <= s.endTime
      ) {
        offset = newElement.startTime - s.startTime;
        console.log("startTime", offset, durr);
        return {
          ...newElement,
          startTime: s.endTime + frame,
          endTime: s.endTime + frame + durr,
        }; // There is an overlap
      }
      // Check if the new element's end time is within the range of the existing element
      if (
        newElement.endTime >= s.startTime &&
        newElement.endTime <= s.endTime
      ) {
        offset = newElement.endTime - s.endTime;
        console.log("endTime", offset, durr);
        return {
          ...newElement,
          startTime: newElement.startTime - offset - sdurr,
          endTime: newElement.endTime - offset - sdurr,
        }; // There is an overlap
      }
      // Check if the existing element is completely within the range of the new element
      if (
        s.startTime >= newElement.startTime &&
        s.endTime <= newElement.endTime
      ) {
        offset = Math.max(
          newElement.endTime - s.endTime,
          newElement.startTime - s.startTime
        );
        console.log("contained", offset, durr);
        return {
          ...newElement,
          startTime: s.endTime + frame,
          endTime: s.endTime + frame + durr,
        }; // There is an overlap
      }
      // Check if the existing element completely encompasses the new element
      if (
        s.startTime <= newElement.startTime &&
        s.endTime >= newElement.endTime
      ) {
        offset = s.startTime - newElement.startTime;
        console.log("encompassing", offset, durr);
        return {
          ...newElement,
          startTime: newElement.startTime + offset + durr,
          endTime: newElement.endTime + offset + durr,
        }; // There is an overlap
      }
    }
  }

  return newElement;
};

export default adjustFinalPosition;
