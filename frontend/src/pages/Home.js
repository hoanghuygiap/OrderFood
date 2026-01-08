import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../components/PubicLayout";
import "../styles/home.css";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/random_foods/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch foods");
        }
        return res.json();
      })
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải danh sách món ăn.");
        setLoading(false);
      });
  }, []);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section
        className="hero py-5 text-center"
        style={{ backgroundImage: "url('/images/food2.jpg')" }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "40px 20px",
            borderRadius: "10px",
          }}
        >
          <h1 className="display-4">Quick & Hot Food, Delivered to You</h1>
          <p className="lead">
            Craving something tasty? Let's get it to your door
          </p>

          <form
            method="GET"
            action="/search"
            className="d-flex mt-3"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <input
              type="text"
              name="q"
              placeholder="I would like to eat..."
              className="form-control"
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            />
            <button
              className="btn btn-warning px-4"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Food Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">
            Most Loved Dishes This Month
            <span className="badge bg-danger ms-2">Top Picks</span>
          </h2>

          <div className="row mt-4">
            {loading ? (
              <p className="text-center">Đang tải dữ liệu...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : foods.length === 0 ? (
              <p className="text-center">No foods found</p>
            ) : (
              foods.map((food, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card hovereffect">
                    <img
                      src={`http://127.0.0.1:8000${food.image}`}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                      alt={food.item_name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/food/${food.id}`}>{food.item_name}</Link>
                      </h5>
                      <p className="card-text text-muted">
                        {food.item_description?.slice(0, 40)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold">{food.item_price} VND</span>
                        {food.is_available ? (
                          <Link
                            to={`/food/${food.id}`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            <i className="fas fa-shopping-basket me-1"></i>
                            Order Now
                          </Link>
                        ) : (
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled
                            title="This food item is not available right now. Please try again later."
                          >
                            <i className="fas fa-times-circle me-1"></i>
                            Currently Unavailable
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h2>Ordering in 3 Simple Steps</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <h5>1. Pick a dish you love</h5>
              <p>
                Explore hundreds of mouth-watering options and choose what you
                crave!
              </p>
            </div>
            <div className="col-md-4">
              <h5>2. Share your location</h5>
              <p>Tell us where you are, and we'll handle the rest.</p>
            </div>
            <div className="col-md-4">
              <h5>3. Enjoy doorstep delivery</h5>
              <p>
                Relax while your meal arrives fast and fresh—pay when it's
                delivered.
              </p>
            </div>
          </div>
          <p>Pay easily with Cash on Delivery - hassle-free</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-warning text-center text-dark">
        <h4>Ready to Satisfy</h4>
        <Link to="/login" className="btn btn-dark btn-lg">
          Browse Full Menu
        </Link>
      </section>
    </PublicLayout>
  );
};

export default Home;
