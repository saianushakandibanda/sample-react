const ProductChild = (props) => {
  const inputChange = (event) => {
    props.getAge(event.target.value);
  };

  return <input type="text" name="age" onChange={(e) => inputChange(e)} />;
};

export default ProductChild;
