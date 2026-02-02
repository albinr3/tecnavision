import { Toaster } from "react-hot-toast";
import AdminShell from "./components/AdminShell";

export const metadata = {
    title: "Admin Panel - TecnaVision",
    description: "Panel de administración para gestionar productos y configuración de TecnaVision.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminShell>
            {children}
            <Toaster position="top-right" />
        </AdminShell>
    );
}
