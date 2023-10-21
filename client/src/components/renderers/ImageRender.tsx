/* eslint-disable @typescript-eslint/no-explicit-any */

function ImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

export default ImageRenderer;
