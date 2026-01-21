import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
    title: "Admin Dashboard | Owen Digitals",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({ children }) {
    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
