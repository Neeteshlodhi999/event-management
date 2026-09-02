import React from "react";
import {
  FaFileAlt,
  FaDownload,
  FaCalendarAlt,
  FaChartBar,
  FaUsers,
  FaMoneyBillWave,
  FaTrophy,
  FaFileExcel,
  FaFilePdf,
  FaPlus,
} from "react-icons/fa";

const Reports = () => {
  const reports = [
    {
      id: 1,
      name: "Revenue Report - June 2026",
      type: "PDF",
      date: "10 Jun 2026",
    },
    {
      id: 2,
      name: "Attendance Report - May 2026",
      type: "Excel",
      date: "05 Jun 2026",
    },
    {
      id: 3,
      name: "Event Performance Report",
      type: "PDF",
      date: "01 Jun 2026",
    },
  ];

  const topEvents = [
    {
      name: "Summer Music Festival",
      attendees: 1200,
      revenue: "₹2.4L",
    },
    {
      name: "AI Conference 2026",
      attendees: 850,
      revenue: "₹1.8L",
    },
    {
      name: "Startup Summit",
      attendees: 420,
      revenue: "₹95K",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black text-white">
            Reports & Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            Generate and download detailed business reports.
          </p>
        </div>

        <button className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-3">
          <FaPlus />
          Generate Report
        </button>
      </div>

      {/* Overview Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <FaFileAlt className="text-cyan-400 text-3xl mb-4" />

          <h3 className="text-4xl font-black">128</h3>

          <p className="text-slate-400 mt-2">
            Total Reports
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <FaUsers className="text-green-400 text-3xl mb-4" />

          <h3 className="text-4xl font-black">8,420</h3>

          <p className="text-slate-400 mt-2">
            Total Attendees
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <FaMoneyBillWave className="text-yellow-400 text-3xl mb-4" />

          <h3 className="text-4xl font-black">₹5.8L</h3>

          <p className="text-slate-400 mt-2">
            Revenue Generated
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <FaChartBar className="text-purple-400 text-3xl mb-4" />

          <h3 className="text-4xl font-black">42</h3>

          <p className="text-slate-400 mt-2">
            Events Conducted
          </p>
        </div>
      </div>

      {/* Generate Report */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          Generate New Report
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <select className="bg-slate-900 border border-white/10 rounded-xl p-4">
            <option>Revenue Report</option>
            <option>Attendance Report</option>
            <option>Event Report</option>
            <option>Sales Report</option>
          </select>

          <input
            type="date"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <input
            type="date"
            className="bg-slate-900 border border-white/10 rounded-xl p-4"
          />

          <button className="bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold">
            Generate
          </button>
        </div>
      </div>

      {/* Top Events */}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaTrophy className="text-yellow-400" />
            Top Performing Events
          </h2>

          <div className="space-y-4">
            {topEvents.map((event, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-white/10 rounded-2xl p-5"
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
                  {event.attendees} Attendees
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Summary */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Monthly Summary
          </h2>

          <div className="space-y-5">
            <div className="bg-slate-900 rounded-xl p-5">
              <h3 className="font-semibold mb-2">
                Revenue
              </h3>

              <p className="text-green-400 text-2xl font-bold">
                ₹5.8L
              </p>
            </div>

            <div className="bg-slate-900 rounded-xl p-5">
              <h3 className="font-semibold mb-2">
                Tickets Sold
              </h3>

              <p className="text-cyan-400 text-2xl font-bold">
                8,420
              </p>
            </div>

            <div className="bg-slate-900 rounded-xl p-5">
              <h3 className="font-semibold mb-2">
                Event Success Rate
              </h3>

              <p className="text-purple-400 text-2xl font-bold">
                96%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">
            Recent Reports
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-5">Report Name</th>
                <th className="p-5">Type</th>
                <th className="p-5">Generated Date</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="p-5">
                    {report.name}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        report.type === "PDF"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {report.type}
                    </span>
                  </td>

                  <td className="p-5">
                    {report.date}
                  </td>

                  <td className="p-5">
                    <button className="flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl">
                      <FaDownload />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}

      <div className="grid md:grid-cols-2 gap-6">
        <button className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 flex items-center justify-center gap-4 hover:bg-red-500/20 transition">
          <FaFilePdf className="text-red-400 text-3xl" />

          <div className="text-left">
            <h3 className="font-bold">
              Export PDF Report
            </h3>

            <p className="text-slate-400 text-sm">
              Download printable reports
            </p>
          </div>
        </button>

        <button className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 flex items-center justify-center gap-4 hover:bg-green-500/20 transition">
          <FaFileExcel className="text-green-400 text-3xl" />

          <div className="text-left">
            <h3 className="font-bold">
              Export Excel Report
            </h3>

            <p className="text-slate-400 text-sm">
              Download spreadsheet reports
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Reports;