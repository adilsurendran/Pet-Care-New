import DoctorSidebar from "./DoctorSidebar";

export default function DoctorLayout({ children }) {
  return (
    <div className="doctor-layout">
      <DoctorSidebar />
      <main className="doctor-main">
        {children}
      </main>
    </div>
  );
}
