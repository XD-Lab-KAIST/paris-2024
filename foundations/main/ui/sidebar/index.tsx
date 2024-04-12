import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";
import { useContext } from "react";
import { ScrollContext } from "@/components/main";

export default function Sidebar() {
  const { scrollPos } = useContext(ScrollContext);

  return <S.Sidebar></S.Sidebar>;
}
