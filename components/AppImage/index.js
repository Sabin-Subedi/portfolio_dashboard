import Image from "next/image";
import React, { useEffect } from "react";

function AppImage({ src, alt, ...props }) {
  const [error, setError] = React.useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      onError={() => setError(true)}
      src={error ? "/fallback_img.svg" : src}
      {...props}
      alt={alt || "image"}
    />
  );
}

export default AppImage;
