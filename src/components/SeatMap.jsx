// import rec from "../assets/images/Rec.png";
import Rect from "../assets/images/Rect.png";
import Rectan from "../assets/images/Rectan.png";
import Rectang from "../assets/images/Rectang.png";
import R from "../assets/images/R.png";
import Ryt from "../assets/images/Ryt.png";

const seatMap = {
  1: {
    title: "New York Knicks at Utah Jazz",

    date: "March 26 · Thu · 9:30PM · 2026",

    location: "Madison Square Garden, New York, New York, USA",

    arena: Ryt,

    eventCard: [
      {
        id: 1,
        image: Rect,
        section: "Section 115",
        row: "Row 11, 10-15",
        price: "$150",
        rating: "10 Amazing",
      },

      {
        id: 2,
        image: Rectan,
        section: "Section 107",
        row: "Row 5, 20-25",
        price: "$171",
        rating: "94 Amazing",
      },

      {
        id: 3,
        image: Rectang,
        section: "Section 135",
        row: "Row 10, 1-5",
        price: "$121",
        rating: "10 Amazing",
      },

      {
        id: 4,
        image: Rect,
        section: "Section 97",
        row: "Row 2, 11-15",
        price: "$245",
        rating: "10 Amazing",
      },

      {
        id: 5,
        image: R,
        section: "Section 155",
        row: "Row 35, 1-5",
        price: "$97",
        rating: "82 Amazing",
      },
    ],
  },
};

export default seatMap;
