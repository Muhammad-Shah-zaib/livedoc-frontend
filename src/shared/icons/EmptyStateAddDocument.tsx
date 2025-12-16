import "./EmptyStateAddDocument.css";

function EmptyStateAddDocument() {
  return (
    <div className="empty-state-container">
      <div className="empty-state-scene">
        <div className="floating-elements">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>

        <div className="document-stack-3d">
          <div className="document-3d doc-back">
            <div className="doc-content">
              <div className="doc-line"></div>
              <div className="doc-line short"></div>
              <div className="doc-line"></div>
            </div>
          </div>
          <div className="document-3d doc-middle">
            <div className="doc-content">
              <div className="doc-line"></div>
              <div className="doc-line"></div>
              <div className="doc-line short"></div>
            </div>
          </div>
          <div className="document-3d doc-front">
            <div className="doc-content">
              <div className="doc-line short"></div>
              <div className="doc-line"></div>
              <div className="doc-line"></div>
              <div className="doc-line short"></div>
            </div>
            <div className="doc-corner-fold"></div>
          </div>
        </div>

        <div className="phong-ball-container">
          <div className="phong-ball">
            <div className="ball-highlight"></div>
            <div className="ball-highlight-secondary"></div>
            <div className="ball-reflection"></div>
          </div>
          <div className="ball-shadow"></div>
        </div>

        <div className="plus-button-3d">
          <div className="plus-icon">
            <span className="plus-h"></span>
            <span className="plus-v"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyStateAddDocument;
