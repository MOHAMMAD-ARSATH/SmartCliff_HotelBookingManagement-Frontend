import React, { useState } from 'react';
import { Card, Grid, CardMedia, Dialog, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';


const images = [
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal1.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal2.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal3.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal4.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal5.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal6.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal7.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/38/9e/luxury-suite.jpg?w=1000&h=-1&s=1",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal9.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal10.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal11.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal12.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal13.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal14.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal15.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal16.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal17.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal18.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal19.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal20.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal21.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal22.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal23.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal24.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal25.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal26.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal27.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal28.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal29.jpg",
  "https://cjpallazzio.com/wp-content/uploads/2023/06/gal30.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/38/b2/rooftop.jpg?w=1000&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/38/b3/saffron-restaurant-buffet.jpg?w=1000&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/71/19/47/photo5jpg.jpg?w=1200&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/48/42/e7/cj-pallazzio-hotel.jpg?w=1200&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/38/8b/club-house.jpg?w=1000&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/38/9d/luxury-suite.jpg?w=1000&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/38/9e/luxury-suite.jpg?w=1000&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/38/b1/presidential-suite.jpg?w=1000&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/38/91/gym.jpg?w=1000&h=-1&s=1",

  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/c7/2f/c4/exterior.jpg?w=1000&h=-1&s=1",

];

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  addIcon: {
    fontSize: 50,
    color: 'white',
  },
  card: {
    position: 'relative',
    '&:hover $cardOverlay': {
      opacity: 1,
    },
  },
});

const GalleryImg = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const showModal = (image) => {
    setSelectedImage(image);
    setVisible(true);
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setVisible(false);
  };

  return (
    <div className='m-5'>
      <Grid container spacing={4}>
        {images.map((image, index) => (
          <Grid key={index} item xs={12} md={3}>
            <Card className={classes.card} onClick={() => showModal(image)}>
              <CardMedia
                component="img"
                alt={`Image ${index}`}
                height="400"
                image={image}
              />
              <div className={classes.cardOverlay}>
                <AddIcon className={classes.addIcon} />
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* 
      <IconButton className={classes.closeIcon} onClick={handleCancel}>
        <CloseIcon />
      </IconButton> */}

      <Dialog
        open={visible}
        onClose={handleCancel}
        className={classes.modal}
        maxWidth="lg"
      >
        <CardMedia
          component="img"
          alt="Selected"
          src={selectedImage}
          style={{ width: '100%', height: '650px', overflowY: 'hidden' }}
        />
      </Dialog>
    </div>
  );
};

export default GalleryImg;