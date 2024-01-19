import { useHits } from "react-instantsearch";
import Folder from "../Folder/Folder";
import useLayout from "../../context/LayoutContext";
export default function CustomHits() {
  const { hits, results, sendEvent } = useHits();
  const { grid, setGrid } = useLayout();
  console.log(hits.length);
  return hits.map((hit) => {
    return <Folder folder={hit} key={hit.id} grid={grid} />;
  });
}
