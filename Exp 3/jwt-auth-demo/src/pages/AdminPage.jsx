function AdminPage() {
    return (
        <div className="page-card">

            <h2>Admin Dashboard</h2>

            <p>
                The administrator has complete access to manage users,
                application settings, and protected resources.
            </p>

            <h3>Available Permissions</h3>

            <ul>
                <li>Manage Users</li>
                <li>Create New Accounts</li>
                <li>Edit Existing Records</li>
                <li>Delete Records</li>
                <li>View Reports</li>
            </ul>

            <button className="action-btn">
                Manage Users
            </button>

        </div>
    );
}

export default AdminPage;