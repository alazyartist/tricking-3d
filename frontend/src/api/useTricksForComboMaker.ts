import { useQuery } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

type Trick = {
  name: string;
  type: string;
  id?: number;
  trick_id?: number;
  start_position?: Array<string>;
  end_position: Array<string>;
  variations?: Array<string>;
}

function _getTransitionStart(stances, transition) {
  let start_position = []
  stances.forEach((stance) => {
    if(stance.leg === transition.fromLeg) {
      start_position.push(stance.name)
    }
  })
  return start_position
}

function _getTransitionEnd(stances, transition) {
  let end_position = []
  stances.forEach((stance) => {
    if(stance.leg === transition.toLeg) {
      end_position.push(stance.name)
    }
  })
  return end_position
}

const _reformatTricks = (tricks: any) => {
  let trick_array: Array<Trick> = [];
  let trans_array: Array<Trick> = [];
  const stances = tricks?.filter((trick: any) => trick.type === "Stance");
  const transitions = tricks?.filter((trick: any) => trick.type === "Transition");
  tricks = tricks?.filter((trick: Trick) => { return !stances.includes(trick) });
  tricks = tricks?.filter((trick: Trick) => { return !transitions.includes(trick) });

  // Add Tricks
  tricks?.forEach((trick: any) => {
    const current_trick: Trick = {
      name: trick.name,
      type: trick.type,
      id: trick.id,
      trick_id: trick.trick_id,
      start_position: [trick.takeoffStance],
      end_position: [trick.landingStance],
      variations: trick.Variations,
    }
    trick_array.push(current_trick);
  });

  // Add Transitions
  transitions?.forEach((trick: any) => {
    const current_transition: Trick = {
      name: trick.name,
      type: trick.type,
      id: trick.id,
      trick_id: trick.trick_id,
      start_position: _getTransitionStart(stances, trick),
      end_position: _getTransitionEnd(stances, trick),
    }
    trans_array.push(current_transition);
  })

  return {trick_array, trans_array};
};


const useTricksForComboMaker = () => {
  const apiPrivate = useApiCreds();
  let base_tricks = useQuery(
    ["tricks"],
    async () => {
      const { data } = await apiPrivate.get("/tricks");
      return data;
    },
    { onSuccess: (data) => { } }
  );
  return _reformatTricks(base_tricks.data);
};

export default useTricksForComboMaker;
