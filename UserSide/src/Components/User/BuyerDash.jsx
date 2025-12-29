import React from 'react'
import './dash.css'
import BuyerNav from './BuyerNav'
import BuyerFooter from './BuyerFooter'

const BuyerDash = () => {
  return (
    <div>
  <BuyerNav />



  <div className="container-fluid py-5">
    <div className="container">
      <div className="row gx-5">
        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
          <div className="position-relative h-100">
            <img
              className="position-absolute w-100 h-100 rounded"
              src="/about.jpg"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="border-start border-5 border-primary ps-5 mb-5">
            <h6 className="text-primary text-uppercase">About Us</h6>
            <h1 className="display-5 text-uppercase mb-0">
              We Keep Your Pets Happy All Time
            </h1>
          </div>
          <h4 className="text-body mb-4">
          "Pets bring joy, love, and companionship to our lives. Treat them with care, and they'll fill your days with endless happiness!
          </h4>
          <div className="bg-light p-4">
            <ul
              className="nav nav-pills justify-content-between mb-3"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item w-50" role="presentation">
                <button
                  className="nav-link text-uppercase w-100 active"
                  id="pills-1-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-1"
                  type="button"
                  role="tab"
                  aria-controls="pills-1"
                  aria-selected="true"
                >
                  Our Mission
                </button>
              </li>
              <li className="nav-item w-50" role="presentation">
                <button
                  className="nav-link text-uppercase w-100"
                  id="pills-2-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-2"
                  type="button"
                  role="tab"
                  aria-controls="pills-2"
                  aria-selected="false"
                >
                  Our Vission
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-1"
                role="tabpanel"
                aria-labelledby="pills-1-tab"
              >
                <p className="mb-0">
                "At that time, he was at odds with fate and with Clita, bound by deep contemplation.
Pain and sorrow were his burden, as he dwelled in fleeting moments of indulgence.
Bound by longing, he toiled through the struggles of life.
Clita stood firm, entwined with both joy and sorrow, as fate wove its tale.
Together, they embraced the fleeting nature of time, feeling the weight of both happiness and heartache."
                </p>
              </div>
              <div
                className="tab-pane fade"
                id="pills-2"
                role="tabpanel"
                aria-labelledby="pills-2-tab"
              >
                <p className="mb-0">
                He was lost in deep thought, his heart heavy with sorrow.
Moments of joy slipped away like sand through his fingers.
Life's struggles shaped his journey, filled with both pain and hope.
Yet, he stood strong, embracing both happiness and hardship.
Through it all, he walked forward, carrying the weight of time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fluid py-5">
    <div className="container">
      <div
        className="border-start border-5 border-primary ps-5 mb-5"
        style={{ maxWidth: 600 }}
      >
        <h6 className="text-primary text-uppercase">Services</h6>
        <h1 className="display-5 text-uppercase mb-0">
          Our Excellent Pet Care Services
        </h1>
      </div>
      <div className="row g-5">
        <div className="col-md-6">
          <div className="service-item bg-light d-flex p-4">
            <i className="flaticon-house display-1 text-primary me-4" />
            <div>
              <h5 className="text-uppercase mb-3">Pet Boarding</h5>
              <p>
              Pain and sorrow linger, with no rest, as time moves on.
              Moments of struggle and joy come and go, leaving their mark.
              </p>
              
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="service-item bg-light d-flex p-4">
            <i className="flaticon-food display-1 text-primary me-4" />
            <div>
              <h5 className="text-uppercase mb-3">Pet Feeding</h5>
              <p>
              Pain stays, but time keeps moving.
              Moments pass, but they are never forgotten.
              </p>
              
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="service-item bg-light d-flex p-4">
            <i className="flaticon-grooming display-1 text-primary me-4" />
            <div>
              <h5 className="text-uppercase mb-3">Pet Grooming</h5>
              <p>
              Pain comes and goes, but time moves on.
              Moments stay, even when they fade.
              </p>
         
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="service-item bg-light d-flex p-4">
            <i className="flaticon-cat display-1 text-primary me-4" />
            <div>
              <h5 className="text-uppercase mb-3">Pet Training</h5>
              <p>
              "Pain and sorrow do not last forever; time moves on, and moments come and go. True emotions remain."
              </p>
         
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="service-item bg-light d-flex p-4">
            <i className="flaticon-dog display-1 text-primary me-4" />
            <div>
              <h5 className="text-uppercase mb-3">Pet Exercise</h5>
              <p>
              "Pain comes and goes, but time moves forward, and feelings remain."
              </p>
          
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="service-item bg-light d-flex p-4">
            <i className="flaticon-vaccine display-1 text-primary me-4" />
            <div>
              <h5 className="text-uppercase mb-3">Pet Treatment</h5>
              <p>
              "Compassionate care for happy, healthy pets. Because they deserve the best, always!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  <div className="container-fluid py-5">
    <div className="container">
      <div
        className="border-start border-5 border-primary ps-5 mb-5"
        style={{ maxWidth: 600 }}
      >
        <h6 className="text-primary text-uppercase">Latest Blog</h6>
        <h1 className="display-5 text-uppercase mb-0">
          Latest Articles From Our Blog Post
        </h1>
      </div>
      <div className="row g-5">
        <div className="col-lg-6">
          <div className="blog-item">
            <div className="row g-0 bg-light overflow-hidden">
              <div className="col-12 col-sm-5 h-100">
                <img
                  className="img-fluid h-100"
                  src="/blog-1.jpg"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-12 col-sm-7 h-100 d-flex flex-column justify-content-center">
                <div className="p-4">
                  <div className="d-flex mb-3">
                    <small className="me-3">
                      <i className="bi bi-bookmarks me-2" />
                    
                    </small>
                    <small>
                      <i className="bi bi-calendar-date me-2" />
                      
                    </small>
                  </div>
                  <h5 className="text-uppercase mb-3">
                  "Pembroke Welsh Corgi.."
                  </h5>
                  <p>
                  This adorable Corgi is full of happiness, enjoying a refreshing walk in the rain. Its fluffy coat and cheerful smile make the moment even more heartwarming. With every step, it radiates pure joy and excitement!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="blog-item">
            <div className="row g-0 bg-light overflow-hidden">
              <div className="col-12 col-sm-5 h-100">
                <img
                  className="img-fluid h-100"
                  src="/blog-2.jpg"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-12 col-sm-7 h-100 d-flex flex-column justify-content-center">
                <div className="p-4">
                  <div className="d-flex mb-3">
                    <small className="me-3">
                      <i className="bi bi-bookmarks me-2" />
                      
                    </small>
                    <small>
                      <i className="bi bi-calendar-date me-2" />
                      
                    </small>
                  </div>
                  <h5 className="text-uppercase mb-3">
                  Bernese Mountain Dog
                  </h5>
                  <p>
                  This beautiful dog appears to be a **Bernese Mountain Dog**, known for its gentle and affectionate nature. With its thick, tricolor coat of black, white, and rust, it is both striking and fluffy. Bernese Mountain Dogs are intelligent, loyal, and excellent companions, thriving in active families and loving outdoor adventures.
                  </p>
                 
                </div>
              </div>
            </div>
          </div>
        </div> <div className="container-fluid py-5">
        <div className="container">
          <div className="border-start border-5 border-primary ps-5 mb-5" style={{ maxWidth: 600 }}>
          </div>
          <div className="row g-5">
            {[
              {
                img: "/blog-1.jpg",
                title: "Pembroke Welsh Corgi",
                desc: "This adorable Corgi is full of happiness, enjoying a refreshing walk in the rain.",
              },
              {
                img: "/blog-2.jpg",
                title: "Bernese Mountain Dog",
                desc: "Known for its gentle nature, the Bernese Mountain Dog is a loyal and intelligent companion.",
              },
              // Add two more dog breeds below
              {}, // Placeholder for additional dog breed 1
              {}, // Placeholder for additional dog breed 2
            ].map((blog, index) => (
              <div className="col-lg-6" key={index}>
                <div className="blog-item">
                  <div className="row g-0 bg-light overflow-hidden">
                    <div className="col-12 col-sm-5 h-100">
                      <img className="img-fluid h-100" src={blog.img} alt={blog.title} style={{ objectFit: "cover" }} />
                    </div>
                    <div className="col-12 col-sm-7 h-100 d-flex flex-column justify-content-center">
                      <div className="p-4">
                        <h5 className="text-uppercase mb-3">{blog.title}</h5>
                        <p>{blog.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        
      </div>
    </div>
  </div>
  
<BuyerFooter />
</div>

  )
}

export default BuyerDash