"use client";
import React from "react";
import CanvasComponent from "../components/CanvasComponent";

const ModelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CanvasComponent>{children}</CanvasComponent>;
};

export default ModelLayout;
