import { Grid } from "@react-three/drei";

const GridComponent = () => {
    // Define the grid properties here
    const gridProps = {
        position: [0, 0, 0],
        args: [10.5, 10.5], // Example values, adjust as needed
        cellColor: "grey",
        sectionColor: "grey",
    };

    return (
        <Grid
            position={gridProps.position}
            args={gridProps.args}
            cellColor={gridProps.cellColor}
            sectionColor={gridProps.sectionColor}
        />
    );
};

export default GridComponent;
