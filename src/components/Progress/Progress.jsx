import React, { useState } from "react";
import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import "./progress.css"; // Custom CSS for styling
import useProgress from "../../context/ProgressContext";

const App = () => {
  const [open, setOpen] = useState(false);
  const { uploads, setUploads } = useProgress();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUploads({});
  };

  const handleMinimize = () => {
    setOpen(false);
  };

  return (
    <>
      {Object.keys(uploads).length > 0 && (
        <div className="App">
          {console.log(uploads)}
          <IconButton className="floating-button" onClick={handleOpen}>
            <CircularProgress variant="determinate" value={50} />{" "}
          </IconButton>

          <Dialog open={open} onClose={handleMinimize} fullWidth maxWidth="sm">
            <DialogTitle>
              <div className="dialog-title-content">
                Uploads
                <div className="dialog-actions">
                  <IconButton
                    className="minimize-button"
                    onClick={handleMinimize}
                  >
                    <MinimizeIcon />
                  </IconButton>
                  <IconButton className="close-button" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <List>
                {Object.values(uploads).map((upload, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${upload.name}: ${upload.status}`}
                      />
                      <Tooltip title={`${upload.progress.toFixed(2)}%`} arrow>
                        <CircularProgress
                          size={20}
                          variant="determinate"
                          value={upload.progress}
                        />
                      </Tooltip>
                    </ListItem>
                  );
                })}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default App;
