import { get } from "lodash";
import { Button } from "../../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import {
  addToCartAsync,
  removeItemAsync,
  replayItemAsync,
} from "@/redux/features/cart/cartThunks";
import {  useAppSelector } from "@/redux/hooks";
import { API_RESPONSE } from "@/data/constants";
import Image from "next/image";
import { getImagePath } from "@/utils/helpers";
import { useDispatch } from "react-redux";

export default function GameCard({
  item,
  activeItem,
  setActiveItem,
}) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  function deleteFromCart(cartItemId) {
    dispatch(removeItemAsync(cartItemId));
  }

  function handleAdd(addItem) {
    const data = { ...addItem, quantity: 1 };

    dispatch(addToCartAsync(data))
      .unwrap()
      .then((result) => {})
      .catch((error) => {
        console.error("Failed to add item to cart:", error);
      });
  }
  
  function handleReplay(cartItemId) {
    dispatch(replayItemAsync(cartItemId))
      .unwrap()
      .then((result) => {})
      .catch((error) => {
        console.error("Failed to add item to cart:", error);
      });
  }
  
  const cartItems = item.Items;

  const isLoading = status === API_RESPONSE.loading;

  const PlayedTicket = () => (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="52" viewBox="0 0 60 52" fill="none">
        <g filter="url(#filter0_d_344_5940)">
        <path d="M22.109 35.2443L13.5655 26.9657C13.1052 26.5196 12.4808 26.269 11.8298 26.269C11.1787 26.269 10.5543 26.5196 10.094 26.9657C9.63363 27.4118 9.375 28.0168 9.375 28.6476C9.375 28.96 9.43849 29.2693 9.56186 29.5579C9.68522 29.8465 9.86604 30.1087 10.094 30.3296L20.3855 40.3022C21.3457 41.2326 22.8969 41.2326 23.8571 40.3022L49.906 15.0606C50.3664 14.6146 50.625 14.0095 50.625 13.3787C50.625 12.7478 50.3664 12.1428 49.906 11.6967C49.4457 11.2506 48.8213 11 48.1702 11C47.5192 11 46.8948 11.2506 46.4345 11.6967L22.109 35.2443Z" fill="#00FF38"/>
        <path d="M50.254 11.3376L49.906 11.6967L50.254 11.3376C49.6987 10.7996 48.9489 10.5 48.1702 10.5C47.3917 10.5 46.6419 10.7995 46.0867 11.3374C46.0866 11.3375 46.0866 11.3376 46.0865 11.3376L22.1092 34.5482L13.9135 26.6066C13.3582 26.0686 12.6084 25.769 11.8298 25.769C11.0511 25.769 10.3013 26.0686 9.74604 26.6066C9.19026 27.1451 8.875 27.879 8.875 28.6476C8.875 29.0279 8.95231 29.404 9.1021 29.7544C9.25187 30.1048 9.47095 30.4221 9.74604 30.6887L20.0376 40.6612C21.1917 41.7796 23.0509 41.7796 24.205 40.6612L50.254 15.4197C50.8097 14.8812 51.125 14.1473 51.125 13.3787C51.125 12.61 50.8097 11.8762 50.254 11.3376Z" stroke="#00FF38"/>
      </g>
      <defs>
        <filter id="filter0_d_344_5940" x="-1.625" y="0" width="63.25" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_344_5940"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_344_5940" result="shape"/>
        </filter>
      </defs>
      </svg>
    </div>
  )

  return (
    <Carousel>
      <CarouselContent>
        {cartItems.map((cartItem, index) => {
          const image = getImagePath(get(cartItem, "Item.image"));
          const title = get(cartItem, "Item.title");
          const subtitle = get(cartItem, "Item.subtitle");

          return (
            <CarouselItem
              data-index={index}
              key={`compeiton-banner-${cartItem.cartItemId}`}
              isActive={activeItem?.cartItemId==cartItem.cartItemId}
            >
              <div className="border rounded-md p-4 flex flex-col gap-2 items-center">
                <p>
                  <span className="font-extrabold	">
                    {index + 1} of {item.quantity}
                  </span>{" "}
                  tickets
                </p>
                <div className="flex gap-2">
                  <span>X-{get(cartItem, "positionX", "none")}</span>
                  <span>Y-{get(cartItem, "positionY", "none")}</span>
                </div>
                <div className="relative h-[100px] w-full">
                  <Image
                    src={image}
                    alt={`${cartItem.title}`}
                    fill
                    className="object-contain"
                  />
                  {cartItem.isMarked && <PlayedTicket />}
                </div>
                <div className="w-full flex mt-2 justify-between px-1">
                  <p>{title}</p>
                  <p className="text-gray-400">{subtitle}</p>
                </div>
                <div className="flex gap-5 w-full">
                  <Button
                    variant={
                      activeItem?.cartItemId == cartItem.cartItemId
                        ? "secondary"
                        : "outline"
                    }
                    className="rounded-xl w-full text-sm"
                    disabled={isLoading}
                    onClick={() => {
                      if(cartItem.isMarked) handleReplay(cartItem.cartItemId);
                      setActiveItem(cartItem);
                    }}
                  >
                    {activeItem?.cartItemId == cartItem.cartItemId
                      ? "In Play"
                      : cartItem.isMarked
                      ? "Replay"
                      : "Play"}
                  </Button>
                  <Button
                    variant={
                      activeItem?.cartItemId == cartItem.cartItemId
                        ? "secondary"
                        : "outline"
                    }
                    className="rounded-xl w-full text-sm"
                    onClick={() => deleteFromCart(cartItem.cartItemId)}
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                  <Button
                    variant={
                      activeItem?.cartItemId == cartItem.cartItemId
                        ? "secondary"
                        : "outline"
                    }
                    className="rounded-xl  w-full text-sm"
                    disabled={isLoading}
                    onClick={() => handleAdd(cartItem)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious color="#000" className="left-2" />
      <CarouselNext color="#000" className="right-2" />
    </Carousel>
  );
}
