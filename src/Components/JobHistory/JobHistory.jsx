import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import JobCard from "./JobCard"; // Or pass props to JobCard for dynamic rendering

const JobHistory = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch job data from API (mock example)
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const jobData = [
    {
      id: 1,
      status: "in_progress",
      jobCode: "KC001",
      technicianName: "Mike Roy",
      technicianRole: "Technician",
      standardValue: 4734.43,
      saleValue: 4234.43,
      date: "2025-01-30",
      description:
        "Kitchen Comfort Cooking Layout Upgrade. New premium appliances, custom cabinets, and high-end finishes.",
    },
    {
      id: 2,
      status: "in_progress",
      jobCode: "KC002",
      technicianName: "Alice Chen",
      technicianRole: "Technician",
      standardValue: 5000.0,
      saleValue: 4500.0,
      date: "2025-02-10",
      description:
        "Upgrading all major appliances and installing a custom vent hood. Includes premium tile and lighting.",
    },
    {
      id: 3,
      status: "in_progress",
      jobCode: "KC003",
      technicianName: "John Smith",
      technicianRole: "Technician",
      standardValue: 3200.0,
      saleValue: 3000.0,
      date: "2025-03-01",
      description:
        "Repainting, retiling, and upgrading fixtures for a modern, streamlined look. Minimalist design with durable materials.",
    },
    {
      id: 4,
      status: "pending",
      jobCode: "KC004",
      technicianName: "David Wilson",
      technicianRole: "Technician",
      standardValue: 3899.99,
      saleValue: 3700.0,
      date: "2025-04-15",
      description:
        "Layout redesign in progress. Pending final approval from client. Cabinets are custom order.",
    },
    {
      id: 5,
      status: "pending",
      jobCode: "KC005",
      technicianName: "Mike Roy",
      technicianRole: "Technician",
      standardValue: 6120.5,
      saleValue: 5999.99,
      date: "2025-05-05",
      description:
        "High-end materials selected. Waiting on building permits for electrical upgrades and plumbing relocations.",
    },
    {
      id: 6,
      status: "pending",
      jobCode: "KC006",
      technicianName: "Susan Taylor",
      technicianRole: "Technician",
      standardValue: 2500.0,
      saleValue: 2400.0,
      date: "2025-05-12",
      description:
        "Budget-friendly renovation with mid-range appliances. Awaiting client signature on updated scope.",
    },
    {
      id: 7,
      status: "completed",
      jobCode: "KC007",
      technicianName: "Alice Chen",
      technicianRole: "Technician",
      standardValue: 5000.0,
      saleValue: 4600.0,
      date: "2025-06-20",
      description:
        "Project finished ahead of schedule. Client satisfied with final layout and finishes.",
    },
    {
      id: 8,
      status: "completed",
      jobCode: "KC008",
      technicianName: "John Smith",
      technicianRole: "Technician",
      standardValue: 4100.0,
      saleValue: 4000.0,
      date: "2025-07-01",
      description:
        "All appliances installed successfully. Minor adjustments made to lighting and cabinetry.",
    },
    {
      id: 9,
      status: "completed",
      jobCode: "KC009",
      technicianName: "David Wilson",
      technicianRole: "Technician",
      standardValue: 7299.99,
      saleValue: 7000.0,
      date: "2025-07-15",
      description:
        "Premium renovation completed. Includes marble countertops, custom backsplash, and smart-home integration.",
    },
  ];
  

  // Separate jobs by status
  const inProgressJobs = jobData.filter(job => job.status === 'in_progress');
  const pendingJobs = jobData.filter(job => job.status === 'pending');
  const completedJobs = jobData.filter(job => job.status === 'completed');
  

  return (
    <div>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* In Progress */}
        <div>
          <div className="bg-[#79D3FB] shadow rounded-t-lg p-2 mb-2">
            <h2 className="text-lg font-bold">In Progress</h2>
          </div>
          {inProgressJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        {/* Pending */}
        <div>
          <div className="bg-black text-white shadow rounded-t-lg p-2 mb-2">
            <h2 className="text-lg font-bold">Pending</h2>
          </div>
          {pendingJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        {/* Completed */}
        <div>
          <div className="bg-[#BECDE0] shadow rounded-t-lg p-2 mb-2">
            <h2 className="text-lg font-bold">Completed</h2>
          </div>
          {completedJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobHistory;
