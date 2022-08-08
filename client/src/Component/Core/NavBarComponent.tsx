import { NavbarDiv } from "@Atom/.";

const list = [
  { id: "Location", name: "지역" },
  { id: "Age", name: "나이" },
  { id: "Sex", name: "성별" },
];

type props = { navBarRef: React.MutableRefObject<HTMLDivElement[]> };
export const NavBarComponent = ({ navBarRef }: props) => {
  return (
    <>
      {list.map((item, idx) => {
        const { name } = item;
        return (
          <div className="navbar-item" data-id={idx} ref={(el) => ((navBarRef.current as HTMLDivElement[])[idx] = el as HTMLDivElement)}>
            <NavbarDiv>{name}</NavbarDiv>
          </div>
        );
      })}
    </>
  );
};
