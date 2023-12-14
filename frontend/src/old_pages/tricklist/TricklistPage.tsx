import React, { useState, useEffect } from "react";
import TrickList from "./components/trickList";
import useGetTricklists from "../../api/useTricklists";
import AddListButton from "./components/AddListButton";
import AddComboItemToTricklist from "./components/AddComboItemToTricklist";
import { useStore } from "../../store/store";
import { trpc } from "@utils/trpc";

//TODO @TODO: Something with displayOnly
const TricklistPage = ({ displayOnly, profileuuid }) => {
  // const { data: lists } = useGetTricklists(profileuuid);
  const { data: lists } = trpc.tricklists.findTricklistById.useQuery({
    uuid: profileuuid,
  });
  const [data, setData] = useState(lists);
  const selected = useStore((s) => s.selected_TrickList);
  const [addItemopen, setAddItemopen] = useState(false);
  const [openNewList, setOpenNewList] = useState(false);
  useEffect(() => {
    setData(lists);
    // console.log(selected);
  }, [lists, selected]);

  const _getDate = (e) => {
    let date = new Date(e?.createdAt).toDateString();
    return date.slice(3, date.length);
  };

  return (
    <>
      <div className="no-scrollbar neumorphic flex h-[38vh] max-h-[38vh] w-[80%] flex-col items-center justify-center overflow-scroll rounded-lg bg-zinc-800 p-2">
        <div className="no-scrollbar  h-full w-full overflow-scroll rounded-lg">
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((list, i) => {
              return (
                <>
                  <div key={list.tricklist_id + "div"} className="p-1">
                    <TrickList
                      key={"tricklist" + list.tricklist_id}
                      data={list}
                      date={_getDate(list)}
                      last={i === data.length - 1}
                      // @TODO: Drag shouldn't be hardcoded
                      drag_offset={60}
                    />
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <div className="flex max-h-[30vh] min-h-[10vh] w-[90vw] max-w-[800px] items-center justify-center rounded-lg">
        {!selected && (
          <AddListButton setOpen={setOpenNewList} open={openNewList} />
        )}
        {selected && (
          <AddComboItemToTricklist
            selected={selected}
            tricklist_id={selected.tricklist_id}
            addItemopen={addItemopen}
            setAddItemopen={setAddItemopen}
          />
        )}
      </div>
    </>
  );
};

export default TricklistPage;
