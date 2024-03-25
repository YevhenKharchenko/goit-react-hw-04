const ImageCard = ({ url, description }) => {
  return (
    <div>
      <img src={url} alt={description} width={350} height={200} />
    </div>
  );
};

export default ImageCard;
