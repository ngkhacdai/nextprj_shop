import Order from "@/components/order/Order";

export default function Page({ params, searchParams }) {
  return (
    <div>
      <p>
        <Order status={searchParams.status} />
      </p>
    </div>
  );
}
