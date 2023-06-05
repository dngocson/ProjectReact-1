import { SmoothHorizontalScrolling } from "../../Utility";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
const LadingPageCarosel = ({ items }) => {
  // const items = [
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1682686581484-a220483e6291?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  //     id: 1,
  //     title: "Item1",
  //   },
  //   {
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1685125885305-283d5dd0964f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  //     id: 1,
  //     title: "Item2",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1685435853901-6929169b6bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80",
  //     id: 1,
  //     title: "Item3",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1685644072593-b0e42d185d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  //     id: 1,
  //     title: "Item4",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1682686581484-a220483e6291?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  //     id: 1,
  //     title: "Item1",
  //   },
  //   {
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1685125885305-283d5dd0964f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  //     id: 1,
  //     title: "Item2",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1685435853901-6929169b6bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80",
  //     id: 1,
  //     title: "Item3",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1685644072593-b0e42d185d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  //     id: 1,
  //     title: "Item4",
  //   },
  // ];
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const sliderRef = useRef();
  const movieRef = useRef();
  const handleSrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        movieRef.current.clientWidth * 1,
        sliderRef.current.scrollLeft
      );
    } else {
      // Reset to the first item
      sliderRef.current.scrollLeft = 0;
    }
  };
  const handleSrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(
        sliderRef.current,
        250,
        -movieRef.current.clientWidth * 1,
        sliderRef.current.scrollLeft
      );
    } else {
      // Reset to the last item
      const maxScrollLeft =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      sliderRef.current.scrollLeft = maxScrollLeft;
    }
  };

  useEffect(() => {
    if (isDrag) {
      if (dragMove < dragDown) {
        handleSrollRight();
      }
      if (dragMove > dragDown) {
        handleSrollLeft();
      }
    }
  }, [dragDown, dragMove, isDrag]);

  const onDragStartHandler = (e) => {
    setIsDrag(true);
    setDragDown(e.screenX);
    var img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  const onDragEndHandler = (e) => {
    setIsDrag(false);
  };
  const onDragEnterHandler = (e) => {
    setDragMove(e.screenX);
  };

  return (
    <div className="LP_container" draggable="false">
      <div
        ref={sliderRef}
        className="LP_slider"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(35vh,35vw))`,
        }}
        draggable="true"
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
        onDragEnter={onDragEnterHandler}
      >
        {items.map((item, index) => (
          <Link key={index} to={`/product/detail/${item.id}`}>
            <div
              className="LP_Item" // prettier-ignore
              ref={movieRef}
              draggable="false"
            >
              <img
                className="LP_image"
                src={item.image}
                alt=""
                draggable="false"
              />
              <div className="LP_price">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="LP_btn left-[40px]">
        <AiOutlineLeft className="LP_icon" onClick={handleSrollLeft} />
      </div>
      <div className="LP_btn right-[40px]" onClick={handleSrollRight}>
        <AiOutlineRight className="LP_icon" />
      </div>
    </div>
  );
};

export default LadingPageCarosel;
