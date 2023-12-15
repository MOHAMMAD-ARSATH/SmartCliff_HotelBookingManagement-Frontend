import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Grid, CardMedia, Dialog, IconButton } from '@mui/material';
import { PlayCircleFilled } from '@ant-design/icons';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    background: 'url("https://res.cloudinary.com/tf-lab/image/upload/w_600,h_310,c_fill,g_auto:subject,q_auto,f_auto/restaurant/3a2deff6-27e1-47b8-b623-4abfb0e5aa95/fecf76ed-8487-456c-bd6a-9e8f8c08d288.jpg") center no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35vh',
    backgroundSize: '100% 150%', // Maintain the image's aspect ratio and cover the entire container
    marginTop: '20px',
    borderRadius: '10px',
    cursor: 'pointer',

  },

  playIcon: {
    fontSize: '3em',
    color: '#A8802A',
    fontSize: '60px',
  },
}));

function GalleryVid() {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const showModal = (image) => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className='m-5'>
      <div className={classes.background} onClick={showModal}>
        <div className="play-icon play-icon-animation mt-1">
          <PlayCircleFilled className={classes.playIcon} />
        </div>
      </div>

      <Dialog open={visible} onClose={handleCancel} className={classes.modal} maxWidth="lg">
        <iframe
          width="900px"
          height="500"
          src="https://www.youtube.com/embed/lP82Wz_y8H4?si=_cHi70S02NnWyoIm"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Dialog>
    </div>
  );
}

export default GalleryVid;
