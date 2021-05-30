function SkeletonBaseElement({ type }) {
    const classes = `skeleton ${type}`;

    return <div className={classes}></div>;
}

export default SkeletonBaseElement;
