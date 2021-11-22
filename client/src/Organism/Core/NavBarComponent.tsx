/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import NavbarDiv from "../../Atom/NavbarDiv";

const list = [
  { id: "Location", name: "지역" },
  { id: "Age", name: "나이" },
  { id: "Sex", name: "성별" },
];

export default function NavBarComponent({ ref }: { ref: React.MutableRefObject<HTMLDivElement[]> }) {
  return (
    <>
      {list.map((item, idx) => {
        const { name } = item;
        return (
          <div className="navbar-item" data-id={idx} ref={(el) => ((ref.current as HTMLDivElement[])[idx] = el as HTMLDivElement)}>
            <NavbarDiv>{name}</NavbarDiv>
          </div>
        );
      })}
    </>
  );
}
