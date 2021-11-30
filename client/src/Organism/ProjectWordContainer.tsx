import { useEffect, useRef } from "react";
import ProjectWord from "../Molecules/ProjectWord";

const FIRST_WORD_STEP = 22.5;
const SECOND_WORD_STEP = 14.8;

export default function ProjectWordContainer({ work }: { work: number }) {
  const firstWordRef = useRef<HTMLDivElement>(null);
  const secondWordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    drawWord();
  }, [work]);

  const drawWord = () => {
    if (!firstWordRef.current || !secondWordRef.current) return;
    const first = firstWordRef.current;
    const second = secondWordRef.current;
    if (work <= 100) {
      first.style.display = "none";
      second.style.display = "none";
    } else if (work <= 120) {
      const set = work - 100;
      second.style.display = "none";
      first.style.display = "block";
      first.style.bottom = `${FIRST_WORD_STEP * set}px`;
    } else {
      const set = work - 120;
      second.style.display = "block";
      second.style.bottom = `${SECOND_WORD_STEP * set}px`;
    }
  };

  return (
    <>
      <ProjectWord divRef={firstWordRef}>사랑은</ProjectWord>
      <ProjectWord divRef={secondWordRef}>돌아오는거야</ProjectWord>
    </>
  );
}
