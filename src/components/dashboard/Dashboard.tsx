import DashboardActionBar from "@/components/dashboard/DashboardActionBar";
import DocumentsView from "@/components/documents/DocumentsGrid";

function Dashboard() {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <DashboardActionBar />
      <DocumentsView />
    </div>
  );
}

export default Dashboard;
