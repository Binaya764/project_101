import React from 'react';
import DiyaWall from '../components/DiyaWall';
import { Link } from '../router/Router';

export default function WallPage({
  diyos,
  onOpenLightModal,
  onSelectDiya,
  onLikeDiya,
  likedDiyaIds,
  newlyAddedId
}) {
  return (
    <div className="page-container wall-page">
      {/* Page Breadcrumb Header */}
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <span className="current">Virtual Diyo Wall</span>
          </div>
          <div className="banner-badge-pill">
            <span>✨ Over {diyos.length} community lights shining</span>
          </div>
        </div>
      </div>

      <DiyaWall
        diyos={diyos}
        onOpenLightModal={onOpenLightModal}
        onSelectDiya={onSelectDiya}
        onLikeDiya={onLikeDiya}
        likedDiyaIds={likedDiyaIds}
        newlyAddedId={newlyAddedId}
      />
    </div>
  );
}
