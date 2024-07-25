import React, { useState } from "react";
import { MuiChipsInput } from "mui-chips-input";
import "../Progress/progress.css";
import {
  IconButton,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SVG from "../SVG";
import _ from "lodash";
import axios from "axios";

const ShareBtn = ({ sharedWith, name, type, id }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (newChips) => {
    setEmails([...new Set(newChips)]);
  };
  const handleUpdate = async () => {
    const sharedEmails = _.difference(emails, sharedWith);
    const unsharedEmails = _.difference(sharedWith, emails);

    try {
      setLoading(true);
      await axios.post("https://sharefolder-h6ce7d7ytq-uc.a.run.app", {
        folderId: id,
        userEmailAdded: sharedEmails,
        userEmailRemoved: unsharedEmails,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const [emails, setEmails] = useState(sharedWith);
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <button
        className="dropdown-item d-flex align-items-center gap-3"
        onClick={() => {
          setOpen(true);
        }}
      >
        <SVG
          path={[
            "M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z",
          ]}
        />
        {`Share `}
      </button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="dialog-title-content">
            {`Share ${name}`}
            <div className="dialog-actions">
              <IconButton
                className="close-button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <MuiChipsInput
                value={emails}
                onChange={handleChange}
                addOnBlur
                addOnWhichKey={[" ", "Enter"]}
                variant="outlined"
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => {
              setOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="outlined" color="success">
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShareBtn;
