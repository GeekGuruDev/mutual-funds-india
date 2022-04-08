const FundInfo = ({ name, value }) => {
  return (
    <div className="mr-24">
      <h5 className="font-medium">{name} </h5>
      <p>{value}</p>
    </div>
  );
};

export default FundInfo;
