import React, { useState, useEffect } from "react"


const optionsButtons = ({ selectedTrick, data, updateOptions }) => {
  const [sortName, setSortName] = useState("Name (A)")
  const [sortValue, setSortValue] = useState("Value (A)")

  const sortByName = () => {
    const newData = [...data]
    if (sortName === "Name (A)") {
      setSortName("Name (D)")
      newData.sort((a, b) => a.name < b.name ? 1 : -1,)
    }
    else if (sortName === "Name (D)") {
      setSortName("Name (A)")
      newData.sort((a, b) => a.name > b.name ? 1 : -1,)
    }
    return newData
  }
  const sortByValue = () => {
    const newData = [...data]
    if (sortValue === "Value (A)") {
      setSortValue("Value (D)")
      newData.sort((a, b) => a.value < b.value ? 1 : -1,)
    }
    else if (sortValue === "Value (D)") {
      setSortValue("Value (A)")
      newData.sort((a, b) => a.value > b.value ? 1 : -1,)
    }
    return newData
  }
  const showSimilar = () => {
    let newData = [...data]
    if (selectedTrick) {
      newData = newData.filter((cur) => {
        return cur.name.includes(selectedTrick.name)
      })
    }
    return newData
  }

  return (
    <div className="options-header ">
      <button className={`options-header-button
          ${true ? "bg-zinc-300" : ""}`}
        onClick={() => {
          updateOptions(sortByName())
        }}>
        {sortName}</button>

      <button className={`options-header-button
          ${true ? "bg-zinc-300" : ""}`}
        onClick={() => {
          updateOptions(sortByValue())
        }}>
        {sortValue}</button>

      <button className={`options-header-button
          ${selectedTrick ? "bg-zinc-300" : "bg-zinc-600"}`}
        onClick={() => {
          updateOptions(showSimilar())
        }}>
        Similar</button>
    </div>
  )
}
export default optionsButtons;
