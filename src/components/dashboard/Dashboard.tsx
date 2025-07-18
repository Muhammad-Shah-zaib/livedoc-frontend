import DashboardActionBar from "@/components/dashboard/DashboardActionBar";
import DocumentsView from "@/components/documents/DocumentsGrid";
import { useAppSelector } from "@/store/store";
import DocumentList from "../documents/DocumentList";

function Dashboard() {
  const { documentViewStyle } = useAppSelector((state) => state.documents);
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <DashboardActionBar />
      {documentViewStyle === "grid" ? <DocumentsView /> : <DocumentList />}
    </div>
  );
}

export default Dashboard;
