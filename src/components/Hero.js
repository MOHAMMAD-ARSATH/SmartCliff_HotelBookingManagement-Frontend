import { Carousel } from 'react-bootstrap';

function Hero({ children, hero }) {
  const carouselImages = [
    "https://az712897.vo.msecnd.net/images/full/64570948-5837-4d03-bede-dceff6de0000.jpeg?k=7b1b232b5c55f70ba9fba3653f6b3bbffc00b2cc4f14bf3f9f28e6eaf44f7b97&o=&hp=1",
    // "https://cf.bstatic.com/xdata/images/hotel/max1024x768/236103734.jpg?k=05a8d7dc565903ffa66072fc3136c2b2fd9a0c1fa23095122aca4e38c444da7b&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/236103734.jpg?k=05a8d7dc565903ffa66072fc3136c2b2fd9a0c1fa23095122aca4e38c444da7b&o=&hp=1",
    "http://cj-pallazzio.hotelsintamilnadu.com/data/Pics/OriginalPhoto/13991/1399114/1399114730/cj-pallazzio-hotel-salem-pic-2.JPEG",
  ];

const renderCarouselItems = () =>
    carouselImages.map((imageUrl, index) => (
      <Carousel.Item key={index}>
        <div
         className="d-block w-100 carousel-item-container"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "76vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            animation: "fadeIn 0.8s ease-in-out forwards",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            {children}
          </div>
        </div>
      </Carousel.Item>
    ));

  return (
    <header className={hero}>
      <style>
        {`
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }

          .carousel .carousel-item {
            transition: opacity 0.8s ease-in-out;
          }

          .carousel .carousel-item-next,
          .carousel .carousel-item-prev,
          .carousel .carousel-item.active {
            display: flex !important;
          }
        `}
      </style>
      <Carousel fade interval={4000} controls={true} indicators={true} nextLabel="" prevLabel="">
        {renderCarouselItems()}
      </Carousel>
    </header>
  );
}

Hero.defaultProps = {
  hero: "defaultHero",
};

export default Hero;

// import { Carousel } from 'react-bootstrap';

// function Hero({ children, hero }) {
//   const carouselImages = [
//     "https://az712897.vo.msecnd.net/images/full/64570948-5837-4d03-bede-dceff6de0000.jpeg?k=7b1b232b5c55f70ba9fba3653f6b3bbffc00b2cc4f14bf3f9f28e6eaf44f7b97&o=&hp=1",
//     // "https://cf.bstatic.com/xdata/images/hotel/max1024x768/236103734.jpg?k=05a8d7dc565903ffa66072fc3136c2b2fd9a0c1fa23095122aca4e38c444da7b&o=&hp=1",
//     "https://cf.bstatic.com/xdata/images/hotel/max1024x768/236103734.jpg?k=05a8d7dc565903ffa66072fc3136c2b2fd9a0c1fa23095122aca4e38c444da7b&o=&hp=1",
//     "http://cj-pallazzio.hotelsintamilnadu.com/data/Pics/OriginalPhoto/13991/1399114/1399114730/cj-pallazzio-hotel-salem-pic-2.JPEG",
//   ];

//   const renderCarouselItems = () => {
//     return carouselImages.map((imageUrl, index) => (
//       <Carousel.Item key={index}>
//         <div
//           className="d-block w-100 carousel-item-container"
//           style={{
//             backgroundImage: `url(${imageUrl})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "76vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             className="carousel-item-content"
//             style={{
//               textAlign: "center",
//               color: "white", // Adjust text color if needed
//             }}
//           >
//             {children}
//           </div>
//         </div>
//       </Carousel.Item>
//     ));
//   };

//   return (
//     <header className={hero}>
//       <style>
//         {`
//           .carousel-item-container {
//             opacity: 0;
//             animation: fadeIn 1s forwards;
//           }

//           @keyframes fadeIn {
//             to {
//               opacity: 1;
//             }
//           }
//         `}
//       </style>
//       <Carousel nextLabel="" prevLabel="">
//         {renderCarouselItems()}
//       </Carousel>
//     </header>
//   );
// }

// Hero.defaultProps = {
//   hero: "defaultHero",
// };

// export default Hero;