function EditorPage() {
    return (
        <div className="page-card">

            <h2>Editor Dashboard</h2>

            <p>
                Editors can modify and publish content but cannot
                manage users or system settings.
            </p>

            <h3>Available Permissions</h3>

            <ul>
                <li>Create Articles</li>
                <li>Edit Content</li>
                <li>Publish Content</li>
                <li>View Reports</li>
            </ul>

            <button className="action-btn">
                Edit Content
            </button>

        </div>
    );
}

export default EditorPage;