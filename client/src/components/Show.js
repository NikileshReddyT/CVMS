import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { Flag } from "@mui/icons-material";

function Show() {
  const [res, setRes] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false); // Track deletion state
  const [isLoading, setIsLoading] = useState(false);
  const [isAllDeleting, setIsAllDeleting] = useState(false); // Track deletion state

  useEffect(() => {
    setIsLoading(true);
    console.log(navigator.onLine);
    axios
      .get("http://localhost:8081/showall")
      .then((response) => {
        console.log(response.data);
        setRes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);

  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  const handleDeleteItem = async (itemId) => {
    if (!isValidObjectId(itemId)) {
      console.error("Invalid ObjectId format");
      return;
    }

    setIsDeleting(true); // Prevent multiple deletions in progress

    try {
      const response = await axios.delete(
        `http://localhost:8081/delete/${itemId}`
      );
      if (response.status === 200) {
        // Successful deletion
        setRes((prevRes) => prevRes.filter((item) => item._id !== itemId)); // Update UI immediately
        console.log(`Item with ID ${itemId} deleted successfully.`);
      } else {
        console.error(`Error deleting item: ${response.statusText}`);
        // Provide user feedback about the error
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // Provide user feedback about the error
    } finally {
      setIsDeleting(false); // Allow further deletions
    }
  };

  const handleDeleteAll = () => {
    setIsAllDeleting(true);
    axios
      .delete("http://localhost:8081/deleteall")
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        setIsAllDeleting(false);
      })
      .catch((error) => {
        console.error("Error deleting all items:", error);
        setIsAllDeleting(false);

        // Provide user feedback about the error
      });
  };

  return (
    <div>
      <ol className='data-ol'>
        {!isLoading ? (
          res.length === 0 ? (
            <h1>No Data available</h1>
          ) : (
            res.map((item) => (
              <li key={item._id} className='data-li'>
                <div className='data-div'>
                  Name: {item.name} <br />
                  Mail: {item.email} <br />
                  Role: {item.role}
                  <br />
                  <br />
                </div>
                <button
                  id='deletebutton'
                  onClick={() => handleDeleteItem(item._id)}
                >
                  {isDeleting ? <div className='cursor'></div> : "delete"}
                </button>
              </li>
            ))
          )
        ) : (
          <div className='loader'></div>
        )}
      </ol>
      <button id='deleteall' onClick={handleDeleteAll}>
        {!isAllDeleting ? "Delete All" : <div className='del-all-cursor'></div>}
      </button>
    </div>
  );
}

export default Show;
