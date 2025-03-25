export function EmptyResult() {
    return (
        <div className="empty-result animate-fade-in">
            <div className="empty-content">
                <i className="empty-icon material-icons">travel_explore</i>
                <div className="empty-text">
                    <h5>No results found</h5>
                    <p>Try different keywords or filters</p>
                </div>
            </div>
        </div>
    );
}