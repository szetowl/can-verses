import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function ConfirmForm({song, selectedFile}) {
  return (
    <React.Fragment>
      <Typography variant="h6" align='left' gutterBottom>
      確認資料
      </Typography>
      <List disablePadding>
       
      <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="序號" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {song.no}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="歌曲名稱" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {song.name}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="歌曲檔案" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {selectedFile.name}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="參考資料" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {song.reference}
          </Typography>
        </ListItem>
      </List>
      
    </React.Fragment>
  );
}