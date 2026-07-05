import React from "react";

function Status_order_shower({ status }: { status: number }) {
  const orderStatusMap: Record<number, { text: string; color: string , bg: string }> = {
    0: { text: "در انتظار پرداخت", color: "yellow-500" , bg:"#eab20854" },
    1: { text: "در حال ارسال به پست", color: "white" , bg:"#3b83f665" },
    2: { text: "مرسوله تحویل پست شده", color: "green-600" , bg:"#16a34a69" },
    3: { text: "مرجوعی", color: "orange-500" , bg:"#f9741661" },
    4: { text: "تحویل داده شد", color: "white" , bg:"#16a34a75" },
    5: { text: "کمبود محصول", color: "white" , bg:"#dc26265c" },
  };
  return (
    <span style={{ backgroundColor: orderStatusMap[status]?.bg || '' }} className={`p-1 px-2 rounded-3xl text-${orderStatusMap[status].color}`}>
      {orderStatusMap[status].text}
    </span>
  );
}

export default Status_order_shower;
