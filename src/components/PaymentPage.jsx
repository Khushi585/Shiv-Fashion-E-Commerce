import React from "react";

export default function PaymentPage() {
  const methods = [
    {
      id: 1,
      name: "PhonePe",
      img: "https://i.pinimg.com/736x/2a/cf/b6/2acfb6fb41f7fcb82c3230afdecff714.jpg",
    },
    {
      id: 2,
      name: "Paytm",
      img: "https://static.vecteezy.com/system/resources/thumbnails/051/336/404/small_2x/paytm-transparent-icon-free-png.png",
    },
    {
      id: 3,
      name: "Google Pay",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq_S1I-kRo8EmqBe0MSfTSRdtAflozeeDoBQ&s",
    },
    {
      id: 4,
      name: "BHIM UPI",
      img: "https://www.presentations.gov.in/wp-content/uploads/2020/06/BHIM_Preview.png",
    },
    {
      id: 5,
      name: "Scan And Pay",
      img: "https://media.istockphoto.com/id/1358621997/vector/qr-code-smartphone-scanner-linear-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=ePiWZHIbseW9GwmM498rRKC_Dvk8IsKv41nqnC8iZhQ=",
    },
    {
      id: 6,
      name: "Card",
      img: "https://png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-credit-card-icon-png-image_1025464.jpg"
    },
  ];

  return (
    <div className="w-full py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 border-b-4 border-yellow-500 inline-block pb-1">
          💳 Supported Payment Methods
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Secure payments via UPI & Wallets
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {methods.map((method) => (
         <div
      key={method.id}
      className="flex flex-col items-center justify-center bg-white border-2 border-yellow-500 rounded-xl shadow-sm hover:shadow-md p-4 transition"
    >
            <img
              src={method.img}
              alt={method.name}
              className="w-12 h-12 object-contain"
            />
            <p className="mt-2 text-gray-700 text-sm font-medium">{method.name}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-600 text-sm">
        <p>🔒 100% Secure & Encrypted Payments</p>
        <p className="mt-1">Trusted by Shiv Fashion customers</p>
      </div>
    </div>
  );
}
