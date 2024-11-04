import '../../styles/Proof.scss';
import skeletonImage from '/images/30bc3a50-a6d2-426d-946e-4975ad0e1f20.png';

export default function SkeletonLoading() {
    return (
        <div className="skeleton-loading-container">
            <p className="loading-text">Fetching data, please wait</p>
            <img src={skeletonImage} alt="Loading" className="loading-image" />
        </div>
    );
}
