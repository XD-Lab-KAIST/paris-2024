import * as S from "./styles";
import { useState, useEffect, useMemo, useRef } from "react";
import { useContext } from "react";
import { ScrollContext } from "@/components/main";

export default function Sidebar() {
  const { scrollPos } = useContext(ScrollContext);

  const [changing, setChanging] = useState(false);

  useEffect(() => {
    if (scrollPos !== 0 && scrollPos !== 1) setChanging(true);
    const timeout1 = setTimeout(() => {
      setChanging(false);
    }, 500);
    return () => {
      clearTimeout(timeout1);
    };
  }, [scrollPos]);

  return (
    <S.Sidebar
      style={{
        opacity: changing ? 1 : 0,
        transition: "all 0.5s",
      }}
    >
      <S.Element
        style={{
          // transform: `translateY(${scrollPos ** 2 * 50}vh)`,
          transform: `translateY(${scrollPos * 50}vh)`,
        }}
      />
    </S.Sidebar>
  );
}
