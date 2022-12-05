import DropDown from "../../components/Dropdown.js";
import { IoNotificationsSharp } from "react-icons/io5";
import { Button, Tooltip } from "@mui/material";
import toast from "react-hot-toast";

function App() {
  return (
    <div>
      {" "}
      <div>
        <Button
          onClick={() =>
            toast("dsds", {
              type: "warning",
            })
          }
        >
          Toast
        </Button>
        <DropDown>
          <IoNotificationsSharp />
        </DropDown>
      </div>
    </div>
  );
}

export default App;
