import "./Items.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Items() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  // Navbar handlers
  const handleContactClick = () => navigate("/contact");
  const handleHomeClick = () => navigate("/");
  const handleLoginClick = () => navigate("/login");
  const handleShopClick = () => navigate("/items");
  const slides = [
    {
      id: 1,
      image: "/images/slide1.jpg",
      title: "Minimal Nude Living",
    },
    {
      id: 2,
      image: "/images/slide2.jpg",
      title: "Elegant Home Decor",
    },
    {
      id: 3,
      image: "/images/slide3.jpg",
      title: "Luxury Interior Vibes",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const items = [
    {
      id: 1,
      name: "Furniture",
      image: "/items/furniture.jpg",
      subcategories: ["Almirahs", "Chairs", "Tables", "Beds", "Swing Chairs"],
    },
    {
      id: 2,
      name: "Mirror",
      image: "/items/mirror.jpg",
      subcategories: ["Home Centered", "Arched Mirror", "Circle Mirror", "Rectangle Mirror", "Designer Mirror"],
    },
    {
      id: 3,
      name: "Chandeliers",
      image: "/items/chandelier.jpg",
      subcategories: [
        "Crystal Chandeliers",
        "Modern Chandeliers",
        "Traditional Chandeliers",
        "Pendant Lights",
        "Designer Chandeliers"
      ],
    },
    {
      id: 4,
      name: "Mats",
      image: "/items/mat.jpeg",
      subcategories: [
        "Door Mats",
        "Floor Mats",
        "Yoga Mats",
        "Decorative Rugs",
        "Kids Mats"
      ],
    },
    {
      id: 5,
      name: "Couches",
      image: "/items/couch.jpg",
      subcategories: [
        "Single Seater",
        "Double Seater",
        "L-Shaped",
        "Recliners",
        "Sofa Cum Bed"
      ],
    },
    {
      id: 6,
      name: "Vase",
      image: "/items/vase.jpg",
      subcategories: [
        "Ceramic Vases",
        "Glass Vases",
        "Metal Vases",
        "Decorative Vases",
        "Flower Vase"
      ],
    },
  ];
  const handleViewMore = (item) => {
    setSelectedCategory(item);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };
  if (selectedCategory) {
    return (
      <>
        {/* Navbar removed to prevent double rendering */}
        <section className="items-detail">
        <div className="detail-header">
          <button
            onClick={handleBack}
            className="back-btn"
            style={{ marginLeft: "24px" }}
          >
            ← Back
          </button>
          <h1
            style={{
              marginTop: "50px",
              marginBottom: "32px",
              textAlign: "center",
              margin: "auto",
              fontFamily: [
                "Furniture",
                "Mirror",
                "Chandeliers",
                "Mats",
                "Couches",
                "Vase"
              ].includes(selectedCategory.name) ? "'Playfair Display', serif" : undefined,
              fontStyle: [
                "Furniture",
                "Mirror",
                "Chandeliers",
                "Mats",
                "Couches",
                "Vase"
              ].includes(selectedCategory.name) ? "italic" : undefined,
              color: [
                "Furniture",
                "Mirror",
                "Chandeliers",
                "Mats",
                "Couches",
                "Vase"
              ].includes(selectedCategory.name) ? "#5e4b3c" : undefined,
              fontSize: [
                "Furniture",
                "Mirror",
                "Chandeliers",
                "Mats",
                "Couches",
                "Vase"
              ].includes(selectedCategory.name) ? "3.2rem" : undefined
            }}
          >
            {selectedCategory.name}
          </h1>
        </div>

        <div
          className="subcategories-grid"
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            gap: "32px",
            marginTop: "16px",
            paddingBottom: "16px",
            scrollbarWidth: "thin"
          }}
        >
          {selectedCategory.subcategories.map((subcat, index) => {
            // Generate a filename based on subcategory name (lowercase, no spaces)
            let imgName = `/items/${subcat.toLowerCase().replace(/\s+/g, "_")}.jpg`;
            // Furniture
            if (subcat.toLowerCase() === "chairs") {
              imgName = "/items/chairs.jpg";
            }
            if (subcat.toLowerCase() === "swing chairs") {
              imgName = "/items/swing chairs.jpg";
            }
            // Mirror
            if (subcat.toLowerCase() === "home centered") {
              imgName = "/items/Home_Centered.jpg";
            }
            if (subcat.toLowerCase() === "arched mirror") {
              imgName = "/items/Arched Mirror.jpg";
            }
            if(subcat.toLowerCase()==="circle mirror"){
              imgName="/items/circle mirror.jpg";
            }
            if(subcat.toLowerCase()==="rectangle mirror"){
              imgName="/items/reactangle mirror.jpg";
            }
            if(subcat.toLowerCase()==="designer mirror"){
              imgName="/items/designer.jpg";
            }
            // Chandeliers
            if (selectedCategory.name === "Chandeliers") {
              if (subcat.toLowerCase() === "crystal chandeliers") {
                imgName = "/items/crystal chandelier.jpg";
              } else if (subcat.toLowerCase() === "modern chandeliers") {
                imgName = "/items/modern chandeliers.jpg";
              } else if (subcat.toLowerCase() === "traditional chandeliers") {
                imgName = "/items/traditional chnadeliers.jpg";
              } else if (subcat.toLowerCase() === "pendant lights") {
                imgName = "/items/Pendant Lights.jpg";
              } else if (subcat.toLowerCase() === "designer chandeliers") {
                imgName = "/items/Designer Chandeliers.jpg";
              }

            }
                if (selectedCategory.name === "Mats") {
              if (subcat.toLowerCase() === "door mats") {
                imgName = "/items/Door_Mats.jpg";
              } else if (subcat.toLowerCase() === "floor mats") {
                imgName = "/items/Floor.Mats.jpg";
              } else if (subcat.toLowerCase() === "yoga mats") {
                imgName = "/items/Yoga_Mats.jpg";
              } else if (subcat.toLowerCase() === "decorative rugs") {
                imgName = "/items/Decorative_Rugs.jpg";
              } else if (subcat.toLowerCase() === "kids mats") {
                imgName = "/items/Kids_Mats.jpg";
              }
            }
                        // Vase
            if (selectedCategory.name === "Vase") {
              if (subcat.toLowerCase() === "ceramic vases") {
                imgName = "/items/ceramic_vases.jpg";
              } else if (subcat.toLowerCase() === "glass vases") {
                imgName = "/items/glass_vases.jpg";
              } else if (subcat.toLowerCase() === "metal vases") {
                imgName = "/items/metal_vases.jpg";
              } else if (subcat.toLowerCase() === "decorative vases") {
                imgName = "/items/decorative_vases.jpg";
              } else if (subcat.toLowerCase() === "flower vase") {
                imgName = "/items/flower_vases.jpg";
              }
            }

                if (selectedCategory.name === "Couches") {
                          if (subcat.toLowerCase() === "l-shaped") {
                            imgName = "/items/L-Shaped.jpg";
                          } else if (subcat.toLowerCase() === "sofa cum bed") {
                            imgName = "/items/Sofa Cum Bed.jpg";
                          }
                        }
            return (
              <div
                key={index}
                className="subcategory-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "320px",
                  minHeight: "270px",
                  background: "#fafafa",
                  borderRadius: "20px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                  padding: "40px 32px",
                  justifyContent: "center"
                }}
              >
                <div style={{
                  width: "160px",
                  height: "160px",
                  marginBottom: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid #e48e38",
                  borderRadius: "18px",
                  background: "#fff",
                  boxShadow: "0 2px 12px 0 rgba(166, 124, 82, 0.10)"
                }}>
                  <img
                    src={imgName}
                    alt={subcat}
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      background: "#eee"
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = "/items/subcat_default.jpg"; }}
                  />
                </div>
                <h3 style={{ textAlign: "center", fontSize: "1.4rem", marginBottom: "12px" }}>{subcat}</h3>
                <p style={{ textAlign: "center", marginBottom: "18px" }}>Explore {subcat.toLowerCase()}</p>
                <button
                  className="explore-btn"
                  onClick={() => {
                    if (subcat.toLowerCase() === "arched mirror") {
                      navigate("/mirrors/arched");
                    } else if (subcat.toLowerCase() === "circle mirror") {
                      navigate("/mirrors/circle");
                    } else if (subcat.toLowerCase() === "home centered") {
                      navigate("/homecentered");
                    } else if (subcat.toLowerCase() === "crystal chandeliers") {
                      navigate("/chandeliers/crystal");
                    } else if (subcat.toLowerCase() === "modern chandeliers") {
                      navigate("/chandeliers/modern");
                    } else if (subcat.toLowerCase() === "traditional chandeliers") {
                      navigate("/chandeliers/traditional");
                    } else if (subcat.toLowerCase() === "pendant lights") {
                      navigate("/chandeliers/pendant");
                    } else if (subcat.toLowerCase() === "door mats") {
                      navigate("/mats/doormats");
                    } else if (subcat.toLowerCase() === "floor mats") {
                      navigate("/mats/floormats");
                    } else if (selectedCategory.name === "Couches" && subcat.toLowerCase() === "single seater") {
                      navigate("/couches");
                    } else if (selectedCategory.name === "Vase" && subcat.toLowerCase() === "ceramic vases") {
                      navigate("/ceramicvases");
                    } else if (selectedCategory.name === "Vase" && subcat.toLowerCase() === "glass vases") {
                      navigate("/glassvases");
                    } else if (selectedCategory.name === "Vase" && subcat.toLowerCase() === "metal vases") {
                      navigate("/metalvases");
                    } else if (selectedCategory.name === "Vase" && subcat.toLowerCase() === "decorative vases") {
                      navigate("/decorativevases");
                    } else if (selectedCategory.name === "Vase" && subcat.toLowerCase() === "flower vase") {
                      navigate("/flowervase");
                    } else {
                      navigate(`/${subcat.toLowerCase().replace(/\s+/g, "")}`);
                    }
                  }}
                >
                  Explore →
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
    );
  }
  return (
    <>
      <Navbar />
      {/* Navbar removed to prevent double rendering */}
      <section className="items"> 
        <div className="items-header">
          <h1>Shop by Category</h1>
          <p>Browse our wide range of home decor items</p>
        </div>

        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div
                style={{
                  border: "3px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: item.name === "Furniture" ? "24px 4px 4px 4px" : "4px",
                  background: "#fff",
                  marginBottom: "10px"
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                  style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>

              <h2>{item.name}</h2>
              <p className="item-desc">Explore our collection</p>
              <button
                className="view-more-btn"
                onClick={() => handleViewMore(item)}
              >
                View More →
              </button>
            </div>
          ))}
        </div>
        {/* Back Button at top left with arrow icon */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: "fixed",
            bottom: 8,
            left: 8,
            zIndex: 2000,
            padding: "7px 14px 7px 10px",
            borderRadius: "22px",
            background: "#fff",
            color: "#b86b2a",
            border: "1.5px solid #e29547",
            fontWeight: 600,
            fontSize: "0.98rem",
            boxShadow: "0 1px 5px #e2954722",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "background 0.22s, color 0.22s, border 0.22s, transform 0.22s",
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#f7ede2';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.border = '1.5px solid #b86b2a';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#b86b2a';
            e.currentTarget.style.border = '1.5px solid #e29547';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span style={{fontSize: 17, marginRight: 4, display: 'flex', alignItems: 'center'}}>&larr;</span>
          <span style={{fontSize: '0.97rem'}}>Back</span>
        </button>
      </section>
    </>
  );
}

export default Items;
