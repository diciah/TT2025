import { Item } from "../Item/Item";

const ItemDetail = (props) => {
  return (
    <div>
      <Item {...props} showDescription={true} />
    </div>
  );
};

export default ItemDetail;
