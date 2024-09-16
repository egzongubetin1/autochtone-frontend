export const errorHandler = (error) => {
  if (error.response && error.response.status > 500) {
    return "An internal server error occurred";
  } else {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred.";
    return errorMessage;
  }
};

export const getRevalidateTime = (revalidate) => {
  return process.env.NODE_ENV === "production" ? revalidate : 0;
};

export const getImagePath = (source) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${source}`;
};

export const getUserImagePath = (source) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_USER_URL}${source}`;
};
