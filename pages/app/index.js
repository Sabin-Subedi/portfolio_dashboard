import DropDown from "../../components/Dropdown.js";
import { IoNotificationsSharp } from "react-icons/io5";
import { Tooltip } from "@mui/material";

function App() {
  return (
    <div>
      {" "}
      <div>
        <DropDown>
          <IoNotificationsSharp />
        </DropDown>
      </div>
    </div>
  );
}

export default App;
