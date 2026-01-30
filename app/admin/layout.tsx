import { Toaster } from "react-hot-toast";
import AdminShell from "./components/AdminShell";

export const metadata = {
    title: "Admin Panel - TecnoVision",
    description: "Panel de administración para gestionar productos y configuración de TecnoVision.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminShell>
            {children}
            <Toaster position="top-right" />
        </AdminShell>
    );
}
