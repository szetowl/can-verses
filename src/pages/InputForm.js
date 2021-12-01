import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function InputForm({song, handleChange, selectedFile, handleSelect}) {
  
  return (
    <React.Fragment>
      <Typography variant="h6" align="left" gutterBottom>
        資料輸入
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="songName"
            name="songName"
            label="歌曲名稱"
            defaultValue={song.name}
            onChange={handleChange("name")}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="songNo"
            name="songNo"
            label="序號"
            defaultValue={song.no}
            onChange={handleChange("no")}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            type="file"
            id="songFile"
            name="songFile"
            label="歌曲檔案"
            onChange={handleSelect}
            fullWidth
            variant="standard"
          />
          </Grid>
        <Grid item xs={12}>
          <TextField
            id="songRef"
            name="songRef"
            label="參考資料"
            defaultValue={song.reference}
            onChange={handleChange("reference")}
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
