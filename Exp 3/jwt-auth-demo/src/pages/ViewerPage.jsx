function ViewerPage() {
    return (
        <div className="page-card">

            <h2>Viewer Dashboard</h2>

            <p>
                Viewers have read-only access to the application.
            </p>

            <h3>Available Permissions</h3>

            <ul>
                <li>View Articles</li>
                <li>View Reports</li>
                <li>Browse Content</li>
            </ul>

            <button className="action-btn">
                View Content
            </button>

        </div>
    );
}

export default ViewerPage;