import React, { useState, useEffect } from "react"


const optionsButtons = ({ data, updateOptions }) => {
  const [selected, setSelected] = useState(0)
  const [sortType, setSortType] = useState("Name (A)")

  const sortByName = () => {
    const newData = [...data]
    if (sortType === "Name (A)") {
      setSortType("Name (D)")
      newData.sort((a, b) => a.name < b.name ? 1 : -1,)
    }
    else if (sortType === "Name (D)") {
      setSortType("Name (A)")
      newData.sort((a, b) => a.name > b.name ? 1 : -1,)
    }
    return newData
  }

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <button className={`options-header-button
          ${selected === 1 ? "bg-zinc-600" : ""}`}
        onClick={() => {
          setSelected(1)
          updateOptions(sortByName())
        }
        }>
        {sortType}</button>
      <button className={`options-header-button
          ${selected === 2 ? "bg-zinc-600" : ""}`}
        onClick={() => {
          setSelected(2)
          updateOptions("first")
        }
        }>
        Rotation</button>
      <button className={`options-header-button
          ${selected === 3 ? "bg-zinc-600" : ""}`}
        onClick={() => {
          setSelected(3)
          updateOptions("first")
        }
        }>
        Variation</button>
    </div>
  )
}
export default optionsButtons;
