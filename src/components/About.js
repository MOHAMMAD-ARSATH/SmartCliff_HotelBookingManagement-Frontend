import { Link } from "react-router-dom";

function About() {

  return (
    <div className='col-md-12'>

      <div className="row" style={{ height: "95vh", alignItems: "center" }}>
        <div className="col-md-6">
          <div className='landing mr-4 ml-3'></div>
        </div>

        <div className="col-md-6 mb-2" style={{ fontSize: '19px' }}>
          <div className='mr-3'>
            <h1 style={{ color: "#A8802A" }}>Welcome to</h1>
            <h3 style={{ fontSize: "25px" }}>CJ Pallazzio</h3>

            <div style={{ fontSize: "17px" }}>
              CJ Pallazzio  a <span style={{ fontWeight: "bold" }}>“Business Class Luxury”</span> hotel offers comfortable stay to it’s guests with it’s chic  and stylish rooms, which includes 12 Suites,  20 Premium rooms and 40 Executive rooms. 5 Multipurpose Banquet halls capable of accommodating more than 800 guests. Saffron the Multi Cuisine restaurant at the lobby level adds to the comfort. FlyingMonk  the Bar says it all with a variety of imported and domestic  liquors to opt from.
            </div>
            <br />
            <div style={{ fontSize: "17px" }}>
              Enjoy our hospitality; enjoy <span style={{ fontWeight: "bold" }}>‘Business Class Luxury’</span>, be our guest whether you are looking for stopovers between trips or a business visit to the city. Welcoming friends or relatives for a sumptuous celebration is yet another reason to be here. What more, enjoy our exclusive spa and completely unwind to the luxury of our services while you are here.
            </div>
          </div>

          <div className='mt-3'>
            <Link to="/about">
              <button
                type='button'
                style={{
                  backgroundColor: '#A9822D',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  border: '1px solid #3498db',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  borderColor: '#A9822D',
                  fontSize: '15px'

                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = '#A9822D';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#A9822D';
                  e.target.style.color = 'white';
                }}
              >
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;