import { updateCartAsync } from "@/redux/features/cart/cartThunks";
import { useAppSelector } from "@/redux/hooks";
import { getImagePath } from "@/utils/helpers";
import { get } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ImageNext from "next/image";
import { Eye, EyeOff, Pencil, Plus, Undo2, X, Minus } from "lucide-react";
import { Button } from "../../ui/button";
import { useMediaQuery } from 'react-responsive'
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
var FIRST_TIME = true;
const MAGNIFIER_SIZE = 60;
const ZOOM_LEVEL = 2;

const Playground = ({ activeItem, setActiveItem }) => {
 const [zoomable, setZoomable] = useState(true);
 const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
 const [realSize, setRealSize] = useState({ width: 0, height: 0 });
 const [position, setPosition] = useState({
  x: 100,
  y: 100,
  mouseX: 0,
  mouseY: 0,
 });
 const [points, setPoints] = useState([]);
 const containerRef = useRef(null);
 const canvasRef = useRef(null);
 const canvasRef2 = useRef(null);
 const dispatch = useDispatch();
 const cartItems = useAppSelector((state) => state.cart);
 const items = get(cartItems, "cart", []);
 const [mode, setMode] = useState("mark");
 const [isLineHidden, setIsLineHidden] = useState(false);
 const isMobile = useMediaQuery({ maxWidth: 767 })

 useEffect(() => {
  if (items.length > 0) {
   jumpToNextTicket();
  }
 }, [FIRST_TIME, items]);

 const image = useMemo(() => {
  return getImagePath(get(items[0], "Competition.image"));
 }, [items]);

 const markedItems = useMemo(() => {
  return items.filter((item) => item.isMarked);
 }, [items]);

 useEffect(() => {
  const img = new Image();
  img.src = image;
  img.onload = () => {
   setRealSize({ width: img.naturalWidth, height: img.naturalHeight });
  };
 }, [image]);

 useEffect(() => {
  if (isLineHidden) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  drawLines(ctx, points);
 }, [points, isLineHidden]);

 const drawLines = (ctx, points) => {
  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  ctx.beginPath();
  for (let i = 0; i < points.length; i += 2) {
   const start = points[i];
   const end = points[i + 1];
   if (start && end) {
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
   }
  }
 };

 const handleMouseEnter = (e) => {
  setZoomable(true);
  updatePosition(e);
 };

 const handleMouseLeave = (e) => {
  setZoomable(false);
  updatePosition(e);
 };

 const handleMouseMove = (e) => {
  updatePosition(e);
 };

 const updatePosition = (e) => {
  const { left, top } = e.currentTarget.getBoundingClientRect();
  let x = e.clientX - left;
  let y = e.clientY - top;
  setPosition({
   x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
   y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
   mouseX: x - MAGNIFIER_SIZE / 2,
   mouseY: y - MAGNIFIER_SIZE / 2,
  });
 };

 const handleClick = async (e) => {
  const { left, top } = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;

  if (mode == "line") {
   setIsLineHidden(false);
   setPoints((prevPoints) => {
    const newPoints = [...prevPoints, { x, y }];
    if (newPoints.length % 2 === 0) {
     return newPoints;
    }
    return newPoints;
   });
  } else {
   if (!activeItem) return;
   const realX = (x / imageSize.width) * realSize.width;
   const realY = (y / imageSize.height) * realSize.height;

   dispatch(
    updateCartAsync({
     cartItemId: activeItem.cartItemId,
     positionData: {
      positionX: realX,
      positionY: realY,
     },
    })
   );
  }
 };

 const jumpToNextTicket = () => {
  const nextItem = items.find((item) => !item.isMarked);
  if (!nextItem) setActiveItem(null);
  else setActiveItem(nextItem);
 };

 const containerStyle = {
  width: "100%",
  height: `${(realSize.height / realSize.width) * 100}%`,
  position: "relative",
 };

 const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
 };

 useEffect(() => {
  const handleResize = () => {
   if (containerRef.current) {
    const containerWidth = containerRef.current.offsetWidth;
    const calculatedHeight = (realSize.height / realSize.width) * containerWidth;
    containerRef.current.style.height = `${calculatedHeight}px`;
   }
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => {
   window.removeEventListener("resize", handleResize);
  };
 }, [realSize]);

 const toggleLine = (e) => {
  setMode(mode == "line" ? "mark" : "line");
  e.preventDefault();
  e.stopPropagation();
 };

 const undoLine = (e) => {
  setPoints((prevArray) => {
   const length = prevArray.length;
   const newLength = length % 2 === 0 ? length - 2 : length - 1;
   return prevArray.slice(0, newLength);
  });
  e.preventDefault();
  e.stopPropagation();
 };

 const hideLines = (e) => {
  setIsLineHidden(!isLineHidden);
  e.preventDefault();
  e.stopPropagation();
 };

 const clearLines = (e) => {
  setPoints([]);
  e.preventDefault();
  e.stopPropagation();
 };

 useEffect(() => {
   const canvas = canvasRef2.current;
   const ctx = canvas.getContext("2d");

   ctx.clearRect(0, 0, canvas.width, canvas.height);

   markedItems.forEach((item) => {
     const posX = ((item.positionX / realSize.width) * imageSize.width);
     const posY = ((item.positionY / realSize.height) * imageSize.height);

     drawPlus(ctx, posX, posY, 10);
   });
 }, [markedItems, isMobile, realSize, imageSize]);

 const drawPlus = (ctx, x, y, size) => {
   const color = "white";
   const halfSize = size / 2;
   
   ctx.strokeStyle = color;
   ctx.lineWidth = 1.5;

   ctx.beginPath();
   ctx.moveTo(x - halfSize, y);
   ctx.lineTo(x + halfSize, y);
   ctx.stroke();

   ctx.beginPath();
   ctx.moveTo(x, y - halfSize);
   ctx.lineTo(x, y + halfSize);
   ctx.stroke();
 };

 return (
  <>
   <div
    ref={containerRef}
    onClick={handleClick}
    onMouseLeave={handleMouseLeave}
    onMouseEnter={handleMouseEnter}
    onMouseMove={handleMouseMove}
    className={`w-full relative overflow-hidden rounded-[12px] ${mode == "mark" && activeItem && "cursor-none"}`}
    style={containerStyle}
   >
    <TransformWrapper>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
        return (
<>
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          {!isLineHidden && (
            <canvas
              ref={canvasRef}
              width={containerRef.current?.offsetWidth || 0}
              height={(realSize.height / realSize.width) * (containerRef.current?.offsetWidth || 0)}
              style={{ position: "absolute", top: 0, left: 0, zIndex: 60 }}
            />
          )}

          <canvas
            ref={canvasRef2}
            width={containerRef.current?.offsetWidth || 0}
            height={(realSize.height / realSize.width) * (containerRef.current?.offsetWidth || 0)}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 60 }}
          />

          <ImageNext
            fill
            alt=""
            src={image}
            style={imageStyle}
            className="border z-10"
            onLoadingComplete={(result) => {
              setImageSize({ width: result.width, height: result.height });
            }}
          />

{mode == "mark" && activeItem && (
     <>
      <div
       style={{
        zIndex: 60,
        position: "absolute",
        top: `${position.mouseY - 28}px`,
        left: `${position.mouseX - 15}px`,
       }}
      >
       <p className="text-white font-semibold">
        X:
        {Math.floor(((position.mouseX + MAGNIFIER_SIZE / 2) / imageSize.width) * realSize.width)}, Y:
        {Math.floor(((position.mouseY + MAGNIFIER_SIZE / 2) / imageSize.height) * realSize.height)}
       </p>
      </div>

      <div
       style={{
        backgroundPosition: `${position.x}px ${position.y}px`,
        backgroundImage: `url(${image})`,
        backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`,
        backgroundRepeat: "no-repeat",
        display: zoomable ? "flex" : "none",
        top: `${position.mouseY}px`,
        left: `${position.mouseX}px`,
        width: `${MAGNIFIER_SIZE}px`,
        height: `${MAGNIFIER_SIZE}px`,
       }}
       className={`z-50 rounded-full border-2 border-white pointer-events-none absolute items-center justify-center`}
      >
       <Plus size={isMobile?10:16} color="white" />
      </div>
     </>
    )}
</TransformComponent>

      <div className="tools flex justify-end w-unset mt-1 absolute bottom-2 transform -translate-x-1/2 left-1/2 z-[100000]">
        <div className="tools rounded-[10px] bg-secondary flex">
          <Button type="button" variant={"secondary"} onClick={toggleLine}>
            <Pencil size={18} />
          </Button>
          <Button type="button" variant={"secondary"} onClick={undoLine} disabled={points.length < 1}>
            <Undo2 size={18} />
          </Button>
          <Button type="button" variant={"secondary"} onClick={hideLines} disabled={points.length < 1}>
            {!isLineHidden ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
          <Button type="button" onClick={clearLines} variant={"secondary"} disabled={points.length < 1}>
            <X size={18} />
          </Button>
          <Button type="button" variant={"secondary"} onClick={() => zoomIn()}>
            <Plus size={18} />
          </Button>
          <Button type="button" variant={"secondary"} onClick={() => zoomOut()}>
            <Minus size={18} />
          </Button>
        </div>
      </div>
        </>
        )
      }}
    </TransformWrapper>
   </div>
  </>
 );
};

export default Playground;
