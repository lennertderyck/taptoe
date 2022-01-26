import { useContext } from "react";
import { helpContext } from "../contexts/HelpContext";

const useHelp = () => useContext(helpContext);

export default useHelp;