import DashboardActionBar from "@/shared/components/DashboardActionBar";
import DocumentsView from "@/shared/layouts/DocumentsGridView";

function Dashboard() {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <DashboardActionBar />
      <DocumentsView />
    </div>
  );
}

export default Dashboard;
