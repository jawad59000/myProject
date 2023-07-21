import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./slider.css";

const data = [
  {
    id: 1,
    title: "PROBLEM",

    image:
      "https://cache.marieclaire.fr/data/photo/w1000_ci/1bi/femme-debordee-au-travail.jpg",
    texte:
      "Vous êtes fatiguer de toutes c'est tâches a faire et vous ne vous y retrouver plus du tout ?",
  },
  {
    id: 2,
    title: "Solution",

    image:
      "https://fabuleusesaufoyer.com/wp-content/uploads/2022/05/17.05.22-todolist-1.jpg",
    texte:
      "Nous avons la solution pour vous, une todolist accessible a votre bureau comme chez vous de votre pc comme depuis votre mobile.",
  },
  {
    id: 3,
    title: "ENJOY",
    image:
      "https://test.psychologies.com/var/tests/storage/images/3/3/1/3/393133-6-fre-FR/organise%CC%81e_thumb_434_265.jpg",
    texte: "Redevenez vous meme sourier a la vie !",
  },
];

const Slider = () => {
  return (
    <Carousel>
      {/* {console.log(data)} */}
      {data.map((slide) => {
        return (
          <div key={slide.id}>
            <img src={slide.image} alt={slide.title} className="image" />
            <div className="overlay">
              <h3 className="overlay_title">{slide.title}</h3>
              <p className="overlay_p">{slide.texte}</p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Slider;
