import { getAllOrderForShop } from "@/api/Order";
import TableOrder from "./TableOrder";

const Order = async ({ status }) => {
  const orderData = await getAllOrderForShop(!status ? "pending" : status);
  return (
    <div>
      <TableOrder orderData={orderData} />
    </div>
  );
};

export default Order;
