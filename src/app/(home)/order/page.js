import dynamic from "next/dynamic";

const Order = dynamic(() => import("@/components/order/Order"));

export default function Page({ params, searchParams }) {
  return (
    <div>
      <p>
        <Order status={searchParams.status} />
      </p>
    </div>
  );
}
