import getCroppedImg from "@/utils/getCroppedImg";
import { useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({
  imageUrl,
  setCroppedImage,
}: {
  imageUrl: string;
  setCroppedImage: (image: string | null) => void;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  return (
    <Cropper
      image={imageUrl}
      crop={crop}
      aspect={1 / 2}
      onCropChange={setCrop}
      rotation={rotation}
      onRotationChange={setRotation}
      zoom={zoom}
      onZoomChange={setZoom}
      onCropComplete={async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
        setCroppedImage(croppedImage);
      }}
    />
  );
};

export default ImageCropper;
