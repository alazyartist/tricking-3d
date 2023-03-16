import { useQuery } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

type Trick = {
  name: string;
  type: string;
  id?: number;
  trick_id?: number;
  value?: number;
  start_position?: Array<string>;
  end_position: Array<string>;
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
      value: trick.pointValue,
      start_position: [trick.takeoffStance],
      end_position: [trick.landingStance],
    }
    trick_array.push(current_trick);
  });

  // Add Transitions
  transitions?.forEach((trans: any) => {
    const current_transition: Trick = {
      name: trans.name,
      type: trans.type,
      id: trans.id,
      trick_id: trans.trick_id,
      value: trans.pointValue,
      start_position: _getTransitionStart(stances, trans),
      end_position: _getTransitionEnd(stances, trans),
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
