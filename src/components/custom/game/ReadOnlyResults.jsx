"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getImagePath } from "@/utils/helpers";
import { get } from "lodash";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import ImageNext from "next/image";
import { useQuery } from "@tanstack/react-query";
import { BlogService } from "@/services/BlogService";

export function ReadOnlyResults({ orders, competition, showWinner=false }) {
  const containerRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [realSize, setRealSize] = useState({ width: 0, height: 0 });
  const image = getImagePath(get(competition, "image"));
  const points = orders.flatMap(item => item.CartItems);
  const dotsCanvas = useRef(null);

  const { data: winnerBlog, isLoading: blogLoading } = useQuery({
    enabled: !!competition?.competitionId && showWinner,
    queryKey: [`blog/competition/winner`],
    queryFn: async ({ queryKey }) => {
      return await BlogService.getCompetitionWinnerBlog(competition.competitionId);
    },
    retry: false,
  });

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setRealSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [image]);

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

  useEffect(() => {
    const canvas = dotsCanvas.current;
    const ctx = canvas.getContext("2d");
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    points.forEach((item) => {
      const posX = ((item.positionX / realSize.width) * imageSize.width);
      const posY = ((item.positionY / realSize.height) * imageSize.height);
 
      drawPlus(ctx, posX, posY, 10);
    });
  }, [points, realSize, imageSize]);
 
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

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  const containerStyle = {
    width: "100%",
    height: `${(realSize.height / realSize.width) * 100}%`,
    position: "relative",
  };

  const position = useMemo(() => {
    const widthRatio = imageSize.width / realSize.width;
    const heightRatio = imageSize.height / realSize.height;
  
    const renderedX = competition.ballX * widthRatio;
    const renderedY = competition.ballY * heightRatio;
  
    const ballSize = competition.ballSize * widthRatio;

    return {
      position: "absolute",
      top: renderedY - ballSize / 2,
      left: renderedX - ballSize / 2,
      width: ballSize,
      height: ballSize,
    }
  }, [competition, imageSize, realSize]);
  
  const _POINTSPOS = useMemo(() => {
    if(competition.status != "finished") return { black: "", blue: "", red: "" };
    const black = points.filter(point=>point.circle=="black").map(point => `X:${point.positionX} Y:${point.positionY}`).join(', ');
    const blue = points.filter(point=>point.circle=="blue").map(point => `X:${point.positionX} Y:${point.positionY}`).join(', ');
    const red = points.filter(point=>point.circle=="red").map(point => `X:${point.positionX} Y:${point.positionY}`).join(', ');
    return { black, blue, red }
  }, [points])

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
      <div className="col-span-4 md:col-span-3 h-unset rounded-md relative rounded-[12px] overflow-hidden">
        <div 
          ref={containerRef}
          style={containerStyle}
          className={`w-full relative overflow-hidden rounded-[12px]`}
        >
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

          <canvas
            ref={dotsCanvas}
            width={containerRef.current?.offsetWidth || 0}
            height={(realSize.height / realSize.width) * (containerRef.current?.offsetWidth || 0)}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 60 }}
          />

          {competition.status == "finished"&&(
            <ImageNext
              width={position.width||0}
              height={position.height||0}
              alt=""
              src={"/assets/ball.svg"}
              style={position}
              className="z-10"
            />
          )}
        </div>
      </div>
      <div className="col-span-2 relative">
        <Card className="w-full p-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold 	text-center">
              Judge’s Decision
            </CardTitle>
          </CardHeader>
          <CardContent className={"flex flex-col gap-5	 p-2"}>
            <div className="grid grid-cols-2 text-center md:grid-cols-3 gap-2">
              <div className="flex flex-col gap-2 items-center">
                <Checkbox disabled={true} />
                <span className="text-[11px]">
                  Judges (Black)<br/>
                  ({_POINTSPOS["black"] || "-"})
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Checkbox disabled={true} />
                <span className="text-[11px]">
                  Winner (Blue)<br/>
                  ({_POINTSPOS["blue"] || "-"})
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Checkbox disabled={true} />
                <span className="text-[11px]">
                  Your closest only (Red)<br/>
                  ({_POINTSPOS["red"] || "-"})
                </span>
              </div>
            </div>
            <div className="text-sm">
              The image displayed is a scaled representation. For the clearest
              view of your results and 1:1 pixel mapping, please
              <Link href="" className="text-primary font-bold px-2">
                download
              </Link>
              full size image.
            </div>
            {competition.status == "finished" && showWinner && (
              <Button asChild variant={"secondary"} disabled={blogLoading||!winnerBlog}>
                <Link
                  href={`/blog/${winnerBlog?.blogId}`}
                  className=" w-full"
                >View winner page</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
