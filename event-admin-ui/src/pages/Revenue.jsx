import React from "react";
import {
  FaMoneyBillWave,
  FaTicketAlt,
  FaWallet,
  FaChartLine,
  FaDownload,
  FaArrowUp,
} from "react-icons/fa";

const Revenue = () => {
  const transactions = [
    {
      id: 1,
      event: "Summer Music Festival",
      amount: "₹24,500",
      date: "12 Jun 2026",
      status: "Completed",
    },
    {
      id: 2,
      event: "AI Conference",
      amount: "₹15,000",
      date: "10 Jun 2026",
      status: "Completed",
    },
    {
      id: 3,
      event: "Startup Summit",
      amount: "₹8,500",
      date: "08 Jun 2026",
      status: "Pending",
    },
  ];

  const topEvents = [
    {
      name: "Summer Music Festival",
      revenue: "₹2.4L",
      tickets: 1200,
    },
    {
      name: "AI Conference 2026",
      revenue: "₹1.8L",
      tickets: 850,
    },
    {
      name: "Startup Summit",
      revenue: "₹95K",
      tickets: 420,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black text-white">
            Revenue Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            Track earnings, ticket sales and payouts.
          </p>
        </div>

        <div className="flex gap-3">
          <select className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>

          <button className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <FaWallet />
            Withdraw
          </button>
        </div>
      </div>

      {/* Revenue Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <FaMoneyBillWave className="text-green-400 text-3xl mb-4" />

          <h3 className="text-4xl font-black">
            ₹5.8L
          </h3>

          <p className="text-slate-400 mt-2">
            Total Revenue
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <FaTicketAlt className="text-cyan-400 text-3xl mb-4" />

          <h3 className="text-4xl font-black">
            8,420
          </h3>

          <p className="text-slate-400 mt-2">
            Tickets Sold
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <FaWallet className="text-yellow-400 text-3xl mb-4" />

          <h3 className="text-4xl font-black">
            ₹82K
          </h3>

          <p className="text-slate-400 mt-2">
            Pending Payouts
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <FaChartLine className="text-purple-400 text-3xl mb-4" />

          <h3 className="text-4xl font-black">
            ₹1,999
          </h3>

          <p className="text-slate-400 mt-2">
            Avg Ticket Price
          </p>
        </div>
      </div>

      {/* Analytics Chart Placeholder */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Revenue Analytics
          </h2>

          <button className="flex items-center gap-2 text-cyan-400">
            <FaDownload />
            Export Report
          </button>
        </div>

        <div className="h-80 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <FaChartLine className="text-6xl text-cyan-400 mx-auto mb-4" />

            <h3 className="text-xl font-semibold">
              Revenue Chart Area
            </h3>

            <p className="text-slate-400 mt-2">
              Add Recharts / Chart.js here
            </p>
          </div>
        </div>
      </div>

      {/* Revenue By Event */}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Top Performing Events
          </h2>

          <div className="space-y-5">
            {topEvents.map((event, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-2xl p-5 border border-white/10"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold">
                    {event.name}
                  </h3>

                  <span className="text-green-400 font-bold">
                    {event.revenue}
                  </span>
                </div>

                <p className="text-slate-400 text-sm">
                  {event.tickets} Tickets Sold
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payout History */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Payout History
          </h2>

          <div className="space-y-4">
            {[
              "₹50,000 withdrawn",
              "₹30,000 withdrawn",
              "₹20,000 withdrawn",
              "₹15,000 withdrawn",
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-slate-900 p-4 rounded-xl"
              >
                <span>{item}</span>

                <span className="text-green-400">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">
            Recent Transactions
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-5">Event</th>
                <th className="p-5">Amount</th>
                <th className="p-5">Date</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="p-5">
                    {item.event}
                  </td>

                  <td className="p-5 font-semibold text-green-400">
                    {item.amount}
                  </td>

                  <td className="p-5">
                    {item.date}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Growth Card */}

      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
            <FaArrowUp className="text-green-400 text-2xl" />
          </div>

          <div>
            <h3 className="text-3xl font-black">
              +24.5%
            </h3>

            <p className="text-slate-300">
              Revenue Growth Compared To Last Month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;